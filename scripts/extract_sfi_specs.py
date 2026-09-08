"""
Extract SFI spec data from the 7 category pages into structured JSON.
This is the data pipeline for the Instant Spec Search feature.

Usage:
    python scripts/extract_sfi_specs.py

Output:
    _data/sfi_specs.json
"""

import re
import json
import os

BASE_DIR = os.path.join(os.path.dirname(__file__), "..", "sfifoundation.com")
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "_data", "sfi_specs.json")

CATEGORY_PAGES = {
    "Personal Protective Gear, Restraints & Nets": "protectivegearrestraintsnets/index.html",
    "Auto Racing": "autoracing/index.html",
    "Drag Racing": "drag-racing/index.html",
    "Drag Racing Chassis": "drag-racing-chassis/index.html",
    "Fuel Related": "fuel-related/index.html",
    "Boat Racing": "boat-racing/index.html",
    "Tractor Pulling & Chassis": "tractor-pulling/index.html",
}


def extract_specs_from_html(html_content, category):
    """Parse a category page and extract all spec entries.

    The actual SFI site HTML uses this structure per spec:
        <p>Product Name<br />
        <span ...><a ...>SFI Spec X.X</a> | <a ...>Manufacturers</a><br />
        Effective Date: ...</span></p>

    Some pages (chassis) use inline format:
        <p>SFI Spec X.X Product Name ...</p>
    """
    specs = []

    # Find the entry div
    entry_match = re.search(r'<div class="entry">(.*)', html_content, re.DOTALL)
    if not entry_match:
        return specs

    entry_html = entry_match.group(1)

    # Split by <p> or <p ...> tags
    paragraphs = re.split(r'<p[^>]*>', entry_html)

    current_subcategory = ""

    for p in paragraphs:
        p = p.strip()
        if not p:
            continue

        # Check for subcategory heading: bold text only
        heading_match = re.match(r'^<strong>([^<]+)</strong>\s*</p>', p)
        if heading_match:
            current_subcategory = heading_match.group(1).strip()
            continue

        # Extract spec numbers from links or inline text
        spec_numbers = re.findall(r'SFI Spec ([\d.]+[A-Za-z]*)', p)
        if not spec_numbers:
            continue

        # Extract product name — text before <br or <span
        # Format 1: "Product Name<br />\n<span"
        name_match = re.match(r'^([^<]+?)(?:\s*<br|<span)', p)
        # Format 2: inline "SFI Spec X.X Product Name"
        inline_match = re.match(r'^SFI Spec [\d.]+[A-Za-z]*\s+(.+?)(?:\s*<br|$)', p)

        product_name = ""
        if name_match:
            candidate = name_match.group(1).strip()
            # Skip non-product text
            if candidate and len(candidate) >= 3 and not candidate.startswith("SFI Spec") \
                    and not candidate.startswith("Click") and not candidate.startswith("For a") \
                    and "establish uniform" not in candidate and "category below" not in candidate \
                    and "Below you" not in candidate:
                product_name = candidate
        if not product_name and inline_match:
            product_name = inline_match.group(1).strip()

        if not product_name:
            continue

        # Clean HTML entities
        product_name = product_name.replace("&#8211;", "–").replace("&amp;", "&")
        product_name = re.sub(r'<[^>]+>', '', product_name).strip()

        # Effective date
        date_match = re.search(r'Effective Date:\s*([^<]+)', p)
        effective_date = date_match.group(1).strip().rstrip(')') if date_match else ""

        # Spec PDFs
        spec_pdfs = re.findall(r'href="[^"]*?/?(Spec[^"]*\.pdf)"', p, re.IGNORECASE)

        # Manufacturer PDFs
        mfr_pdfs = re.findall(r'href="[^"]*?/?([\d.]+[A-Za-z]*\s*Manufacturers?\s*List\.pdf)"', p, re.IGNORECASE)

        # Products PDFs
        products_pdfs = re.findall(r'href="[^"]*?/?(Current[\d.]*Products\.pdf)"', p, re.IGNORECASE)

        spec_entry = {
            "product_name": product_name,
            "category": category,
            "subcategory": current_subcategory,
            "spec_numbers": list(dict.fromkeys(spec_numbers)),
            "spec_pdfs": spec_pdfs,
            "manufacturer_pdfs": mfr_pdfs,
            "products_pdfs": products_pdfs,
            "effective_date": effective_date,
        }
        specs.append(spec_entry)

    return specs


def main():
    all_specs = []

    for category, page_path in CATEGORY_PAGES.items():
        full_path = os.path.join(BASE_DIR, page_path)
        if not os.path.exists(full_path):
            print(f"WARNING: {full_path} not found, skipping")
            continue

        with open(full_path, "r", encoding="utf-8") as f:
            html = f.read()

        specs = extract_specs_from_html(html, category)
        print(f"{category}: found {len(specs)} specs")
        all_specs.extend(specs)

    # Sort by first spec number
    def spec_sort_key(s):
        if s["spec_numbers"]:
            parts = re.match(r'(\d+)\.?(\d*)', s["spec_numbers"][0])
            if parts:
                major = int(parts.group(1))
                minor = int(parts.group(2)) if parts.group(2) else 0
                return (major, minor)
        return (999, 999)

    all_specs.sort(key=spec_sort_key)

    # Write output
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(all_specs, f, indent=2, ensure_ascii=False)

    print(f"\nTotal: {len(all_specs)} specs extracted")
    print(f"Output: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
