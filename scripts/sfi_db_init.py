"""
Create the SFI Foundation SQLite database and migrate data from sfi_specs.json.

Usage:
    python scripts/sfi_db_init.py

Output:
    _data/sfi.db
"""

import json
import os
import re
import sys
import uuid
import html
from datetime import date, timedelta
from collections import defaultdict

from dateutil import parser as dateparser

# Ensure scripts/ is on the path so sfi_models can be imported
sys.path.insert(0, os.path.dirname(__file__))

from sfi_models import app, db, Category, Subcategory, Manufacturer, Product, \
    ProductCategory, SpecNumber, Certification, ExpiryTracking

JSON_PATH = os.path.join(os.path.dirname(__file__), "..", "_data", "sfi_specs.json")
CERT_PERIOD_YEARS = 5  # Standard SFI certification period


def slugify(text):
    """Convert text to a URL-safe slug."""
    slug = text.lower().strip()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    return slug.strip("-")


def parse_effective_date(raw):
    """Best-effort parse of messy SFI date strings. Returns date or None."""
    if not raw or not raw.strip():
        return None
    cleaned = raw.strip().rstrip("|").rstrip(")").strip()
    # Take the first date if there is an "edited" note
    match = re.match(r"^(.+?)(?:\s*\(edited|\s*,\s*edited)", cleaned)
    if match:
        cleaned = match.group(1).strip()
    # Remove trailing punctuation
    cleaned = cleaned.rstrip(",).| ")
    try:
        return dateparser.parse(cleaned).date()
    except (ValueError, TypeError):
        return None


def load_json():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def migrate(data):
    """Run the full migration in order of foreign-key dependencies."""

    # --- Phase 1: Categories & Subcategories ---
    cat_map = {}   # name -> Category obj
    subcat_map = {}  # (name, category_name) -> Subcategory obj

    unique_cats = sorted(set(e["category"] for e in data))
    for name in unique_cats:
        cat = Category(name=name, slug=slugify(name))
        db.session.add(cat)
        cat_map[name] = cat
    db.session.flush()

    for entry in data:
        key = (entry["subcategory"], entry["category"])
        if key not in subcat_map and entry["subcategory"]:
            sub = Subcategory(name=entry["subcategory"], category_id=cat_map[entry["category"]].id)
            db.session.add(sub)
            subcat_map[key] = sub
    db.session.flush()

    print(f"  Categories: {len(cat_map)}")
    print(f"  Subcategories: {len(subcat_map)}")

    # --- Phase 2: Deduplicate products & create manufacturers ---
    # Key: (product_name, tuple(spec_numbers)) -> list of entries
    product_groups = defaultdict(list)
    for entry in data:
        key = (html.unescape(entry["product_name"]), tuple(sorted(entry["spec_numbers"])))
        product_groups[key].append(entry)

    # Create manufacturers from unique manufacturer PDFs
    mfr_map = {}  # manufacturer_pdf -> Manufacturer obj
    for key, entries in product_groups.items():
        for entry in entries:
            for mfr_pdf in entry.get("manufacturer_pdfs", []):
                if mfr_pdf and mfr_pdf not in mfr_map:
                    # Extract spec number from PDF name for the placeholder name
                    spec_match = re.match(r"^([\d.]+[A-Za-z]*)", mfr_pdf)
                    spec_label = spec_match.group(1) if spec_match else "Unknown"
                    mfr = Manufacturer(name=f"Manufacturer for Spec {spec_label}")
                    db.session.add(mfr)
                    mfr_map[mfr_pdf] = mfr
    db.session.flush()
    print(f"  Manufacturers: {len(mfr_map)}")

    # --- Phase 3: Products ---
    prod_map = {}  # dedup_key -> Product obj

    for key, entries in product_groups.items():
        product_name, spec_nums = key
        # Pick manufacturer from first entry that has one
        mfr_id = None
        for entry in entries:
            for mfr_pdf in entry.get("manufacturer_pdfs", []):
                if mfr_pdf in mfr_map:
                    mfr_id = mfr_map[mfr_pdf].id
                    break
            if mfr_id:
                break

        prod = Product(name=product_name, manufacturer_id=mfr_id)
        db.session.add(prod)
        prod_map[key] = prod
    db.session.flush()
    print(f"  Products: {len(prod_map)}")

    # --- Phase 4: Product-Category junctions ---
    pc_count = 0
    seen_pc = set()
    for key, entries in product_groups.items():
        prod = prod_map[key]
        for entry in entries:
            cat = cat_map[entry["category"]]
            pc_key = (prod.id, cat.id)
            if pc_key in seen_pc:
                continue
            seen_pc.add(pc_key)

            subcat_key = (entry["subcategory"], entry["category"])
            subcat_id = subcat_map[subcat_key].id if subcat_key in subcat_map else None

            pc = ProductCategory(product_id=prod.id, category_id=cat.id, subcategory_id=subcat_id)
            db.session.add(pc)
            pc_count += 1
    db.session.flush()
    print(f"  Product-Category links: {pc_count}")

    # --- Phase 5: Spec numbers ---
    sn_count = 0
    seen_sn = set()
    for key, entries in product_groups.items():
        prod = prod_map[key]
        # Gather spec data from all entries (they share the same specs)
        first = entries[0]
        for i, spec_num in enumerate(first["spec_numbers"]):
            sn_key = (prod.id, spec_num)
            if sn_key in seen_sn:
                continue
            seen_sn.add(sn_key)

            spec_pdf = first["spec_pdfs"][i] if i < len(first["spec_pdfs"]) else None
            mfr_pdf = first["manufacturer_pdfs"][i] if i < len(first.get("manufacturer_pdfs", [])) else None
            prod_pdf = first["products_pdfs"][i] if i < len(first.get("products_pdfs", [])) else None
            raw_date = first.get("effective_date", "")
            parsed = parse_effective_date(raw_date)

            sn = SpecNumber(
                product_id=prod.id, spec_number=spec_num,
                spec_pdf=spec_pdf, manufacturer_pdf=mfr_pdf, products_pdf=prod_pdf,
                effective_date=raw_date, effective_date_parsed=parsed,
            )
            db.session.add(sn)
            sn_count += 1
    db.session.flush()
    print(f"  Spec numbers: {sn_count}")

    # --- Phase 6: Certifications (seeded from effective dates) ---
    cert_count = 0
    for key, entries in product_groups.items():
        prod = prod_map[key]
        first = entries[0]
        for spec_num in first["spec_numbers"]:
            raw_date = first.get("effective_date", "")
            parsed = parse_effective_date(raw_date)
            issue = parsed if parsed else date(2000, 1, 1)  # fallback
            expiry = issue + timedelta(days=CERT_PERIOD_YEARS * 365)

            cert = Certification(
                product_id=prod.id,
                spec_number=spec_num,
                issue_date=issue,
                expiry_date=expiry,
                qr_code=str(uuid.uuid4()),
                status="active" if expiry >= date.today() else "expired",
                manufacturer_id=prod.manufacturer_id,
            )
            db.session.add(cert)
            db.session.flush()

            # Expiry tracking record
            days_left = (expiry - date.today()).days
            et = ExpiryTracking(
                certification_id=cert.id,
                product_id=prod.id,
                expiry_date=expiry,
                days_until_expiry=days_left,
            )
            db.session.add(et)
            cert_count += 1
    db.session.flush()
    print(f"  Certifications: {cert_count}")
    print(f"  Expiry tracking records: {cert_count}")


def verify():
    """Run quick sanity checks on the migrated data."""
    checks = [
        ("Categories", Category.query.count()),
        ("Subcategories", Subcategory.query.count()),
        ("Manufacturers", Manufacturer.query.count()),
        ("Products", Product.query.count()),
        ("Product-Category links", ProductCategory.query.count()),
        ("Spec numbers", SpecNumber.query.count()),
        ("Certifications", Certification.query.count()),
        ("Expiry tracking", ExpiryTracking.query.count()),
    ]
    print("\n--- Verification ---")
    for label, count in checks:
        print(f"  {label}: {count}")

    # Test QR lookup
    cert = Certification.query.first()
    if cert:
        print(f"\n  Sample QR lookup: {cert.qr_code[:12]}... -> {cert.product.name} (Spec {cert.spec_number}, {cert.status})")

    # Test spec search
    sample = SpecNumber.query.filter_by(spec_number="3.2A").first()
    if sample:
        print(f"  Sample spec search: 3.2A -> {sample.product.name}")

    # Test manufacturer view
    mfr = Manufacturer.query.first()
    if mfr:
        prod_count = Product.query.filter_by(manufacturer_id=mfr.id).count()
        print(f"  Sample manufacturer: {mfr.name} -> {prod_count} products")


def main():
    # Remove old DB if it exists
    db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "_data", "sfi.db"))
    if os.path.exists(db_path):
        os.remove(db_path)
        print(f"Removed old database: {db_path}")

    data = load_json()
    print(f"Loaded {len(data)} entries from sfi_specs.json\n")

    with app.app_context():
        db.create_all()
        print("Tables created. Migrating data...\n")

        migrate(data)
        db.session.commit()
        print("\nMigration complete.")

        verify()

    print(f"\nDatabase saved to: {db_path}")


if __name__ == "__main__":
    main()
