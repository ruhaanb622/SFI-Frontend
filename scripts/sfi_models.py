"""
SQLAlchemy ORM models for the SFI Foundation database.

Tables:
    categories, subcategories, manufacturers, products,
    product_categories, spec_numbers, certifications, expiry_tracking

Usage:
    from sfi_models import db, app, Category, Subcategory, Manufacturer, ...
    with app.app_context():
        db.create_all()
"""

import os
from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# --- Flask + SQLAlchemy setup ---

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "_data", "sfi.db")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.abspath(DB_PATH)}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# --- Models ---

class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True, nullable=False)
    slug = db.Column(db.String(128), unique=True, nullable=False)
    created_at = db.Column(db.String(64), default=lambda: datetime.now().isoformat())

    subcategories = db.relationship("Subcategory", backref="category", lazy=True)

    def __init__(self, name, slug):
        self.name = name
        self.slug = slug

    def __repr__(self):
        return f"<Category {self.name}>"

    def read(self):
        return {"id": self.id, "name": self.name, "slug": self.slug}


class Subcategory(db.Model):
    __tablename__ = "subcategories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)

    __table_args__ = (db.UniqueConstraint("name", "category_id"),)

    def __init__(self, name, category_id):
        self.name = name
        self.category_id = category_id

    def __repr__(self):
        return f"<Subcategory {self.name}>"

    def read(self):
        return {"id": self.id, "name": self.name, "category_id": self.category_id}


class Manufacturer(db.Model):
    __tablename__ = "manufacturers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    contact_email = db.Column(db.String(255))
    contact_phone = db.Column(db.String(64))
    address = db.Column(db.Text)
    _password_hash = db.Column("password_hash", db.String(255))
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.String(64), default=lambda: datetime.now().isoformat())
    updated_at = db.Column(db.String(64), default=lambda: datetime.now().isoformat())

    products = db.relationship("Product", backref="manufacturer", lazy=True)
    certifications = db.relationship("Certification", backref="manufacturer", lazy=True)

    def __init__(self, name, contact_email=None, contact_phone=None, address=None):
        self.name = name
        self.contact_email = contact_email
        self.contact_phone = contact_phone
        self.address = address

    def __repr__(self):
        return f"<Manufacturer {self.name}>"

    @property
    def password(self):
        return self._password_hash

    @password.setter
    def password(self, raw):
        self._password_hash = generate_password_hash(raw)

    def check_password(self, raw):
        return check_password_hash(self._password_hash, raw) if self._password_hash else False

    def read(self):
        return {
            "id": self.id, "name": self.name,
            "contact_email": self.contact_email,
            "contact_phone": self.contact_phone,
            "is_active": self.is_active,
        }


class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(512), nullable=False)
    description = db.Column(db.Text)
    manufacturer_id = db.Column(db.Integer, db.ForeignKey("manufacturers.id", ondelete="SET NULL"))
    created_at = db.Column(db.String(64), default=lambda: datetime.now().isoformat())
    updated_at = db.Column(db.String(64), default=lambda: datetime.now().isoformat())

    categories = db.relationship(
        "Category", secondary="product_categories", backref="products"
    )
    spec_entries = db.relationship("SpecNumber", backref="product", lazy=True)
    certifications = db.relationship("Certification", backref="product", lazy=True)

    def __init__(self, name, manufacturer_id=None, description=None):
        self.name = name
        self.manufacturer_id = manufacturer_id
        self.description = description

    def __repr__(self):
        return f"<Product {self.name[:40]}>"

    def read(self):
        return {
            "id": self.id, "name": self.name,
            "manufacturer_id": self.manufacturer_id,
            "specs": [s.read() for s in self.spec_entries],
            "categories": [c.read() for c in self.categories],
        }


class ProductCategory(db.Model):
    __tablename__ = "product_categories"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id", ondelete="CASCADE"), nullable=False)
    subcategory_id = db.Column(db.Integer, db.ForeignKey("subcategories.id", ondelete="SET NULL"))

    __table_args__ = (db.UniqueConstraint("product_id", "category_id"),)

    def __init__(self, product_id, category_id, subcategory_id=None):
        self.product_id = product_id
        self.category_id = category_id
        self.subcategory_id = subcategory_id


class SpecNumber(db.Model):
    __tablename__ = "spec_numbers"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    spec_number = db.Column(db.String(32), nullable=False)
    spec_pdf = db.Column(db.String(255))
    manufacturer_pdf = db.Column(db.String(255))
    products_pdf = db.Column(db.String(255))
    effective_date = db.Column(db.String(128))          # raw string from JSON
    effective_date_parsed = db.Column(db.Date)           # best-effort ISO date

    __table_args__ = (db.UniqueConstraint("product_id", "spec_number"),)

    def __init__(self, product_id, spec_number, spec_pdf=None, manufacturer_pdf=None,
                 products_pdf=None, effective_date=None, effective_date_parsed=None):
        self.product_id = product_id
        self.spec_number = spec_number
        self.spec_pdf = spec_pdf
        self.manufacturer_pdf = manufacturer_pdf
        self.products_pdf = products_pdf
        self.effective_date = effective_date
        self.effective_date_parsed = effective_date_parsed

    def __repr__(self):
        return f"<SpecNumber {self.spec_number}>"

    def read(self):
        return {
            "spec_number": self.spec_number,
            "spec_pdf": self.spec_pdf,
            "manufacturer_pdf": self.manufacturer_pdf,
            "effective_date": self.effective_date,
        }


class Certification(db.Model):
    __tablename__ = "certifications"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    spec_number = db.Column(db.String(32), nullable=False)
    qr_code = db.Column(db.String(128), unique=True)
    issue_date = db.Column(db.Date, nullable=False)
    expiry_date = db.Column(db.Date)
    status = db.Column(db.String(16), nullable=False, default="active")
    manufacturer_id = db.Column(db.Integer, db.ForeignKey("manufacturers.id", ondelete="SET NULL"))
    notes = db.Column(db.Text)
    created_at = db.Column(db.String(64), default=lambda: datetime.now().isoformat())
    updated_at = db.Column(db.String(64), default=lambda: datetime.now().isoformat())

    expiry_records = db.relationship("ExpiryTracking", backref="certification", lazy=True)

    __table_args__ = (
        db.CheckConstraint("status IN ('active','expired','revoked','pending')", name="ck_cert_status"),
    )

    def __init__(self, product_id, spec_number, issue_date, qr_code=None,
                 expiry_date=None, status="active", manufacturer_id=None, notes=None):
        self.product_id = product_id
        self.spec_number = spec_number
        self.issue_date = issue_date
        self.qr_code = qr_code
        self.expiry_date = expiry_date
        self.status = status
        self.manufacturer_id = manufacturer_id
        self.notes = notes

    def __repr__(self):
        return f"<Certification {self.spec_number} [{self.status}]>"

    def read(self):
        return {
            "id": self.id, "spec_number": self.spec_number,
            "qr_code": self.qr_code, "status": self.status,
            "issue_date": str(self.issue_date) if self.issue_date else None,
            "expiry_date": str(self.expiry_date) if self.expiry_date else None,
            "product": self.product.name if self.product else None,
            "manufacturer": self.manufacturer.name if self.manufacturer else None,
        }


class ExpiryTracking(db.Model):
    __tablename__ = "expiry_tracking"

    id = db.Column(db.Integer, primary_key=True)
    certification_id = db.Column(db.Integer, db.ForeignKey("certifications.id", ondelete="CASCADE"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    expiry_date = db.Column(db.Date, nullable=False)
    notification_sent = db.Column(db.Boolean, default=False, nullable=False)
    notification_date = db.Column(db.String(64))
    days_until_expiry = db.Column(db.Integer)
    created_at = db.Column(db.String(64), default=lambda: datetime.now().isoformat())

    def __init__(self, certification_id, product_id, expiry_date, days_until_expiry=None):
        self.certification_id = certification_id
        self.product_id = product_id
        self.expiry_date = expiry_date
        self.days_until_expiry = days_until_expiry

    def __repr__(self):
        return f"<ExpiryTracking cert={self.certification_id} expires={self.expiry_date}>"

    def read(self):
        return {
            "certification_id": self.certification_id,
            "expiry_date": str(self.expiry_date),
            "notification_sent": self.notification_sent,
            "days_until_expiry": self.days_until_expiry,
        }
