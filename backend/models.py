from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# initialize the db
db = SQLAlchemy()

class Practice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    providers = db.relationship('Provider', backref='practice', lazy=True)
    patients = db.relationship('Patient', backref='practice', lazy=True)

class Provider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    practice_id = db.Column(db.Integer, db.ForeignKey('practice.id'), nullable=False)

    visits = db.relationship('Visit', backref='provider', lazy=True)

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    dob = db.Column(db.String, nullable=False)
    gender = db.Column(db.String)
    is_active = db.Column(db.Boolean, default=True)
    practice_id = db.Column(db.Integer, db.ForeignKey('practice.id'), nullable=False)

    visits = db.relationship('Visit', backref='patient', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'dob': self.dob,
            'gender': self.gender,
            'is_active': self.is_active
        }

class Visit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    visit_number = db.Column(db.Integer, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('provider.id'), nullable=False)
    chief_complaint = db.Column(db.String)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    history = db.relationship('History', backref='visit', uselist=False)
    physical_exam = db.relationship('PhysicalExam', backref='visit', uselist=False)
    progress = db.relationship('Progress', backref='visit', uselist=False)
    discharge = db.relationship('Discharge', backref='visit', uselist=False)
    narrative = db.relationship('Narrative', backref='visit', uselist=False)

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    visit_id = db.Column(db.Integer, db.ForeignKey('visit.id'), nullable=False)
    content = db.Column(db.Text)

class PhysicalExam(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    visit_id = db.Column(db.Integer, db.ForeignKey('visit.id'), nullable=False)
    content = db.Column(db.Text)

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    visit_id = db.Column(db.Integer, db.ForeignKey('visit.id'), nullable=False)
    content = db.Column(db.Text)

class Discharge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    visit_id = db.Column(db.Integer, db.ForeignKey('visit.id'), nullable=False)
    content = db.Column(db.Text)

class Narrative(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    visit_id = db.Column(db.Integer, db.ForeignKey('visit.id'), nullable=False)
    content = db.Column(db.Text)
