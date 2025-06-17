from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Patient(db.Model):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    dob = db.Column(db.String(10))
    gender = db.Column(db.String(10))
    is_active = db.Column(db.Boolean, default=True) 

    visits = db.relationship('Visit', backref='patient', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "dob": self.dob,
            "gender": self.gender,
            "is_active": self.is_active,
            "visits": [v.to_dict() for v in self.visits]
        }

class Visit(db.Model):
    __tablename__ = 'visits'

    id = db.Column(db.Integer, primary_key=True)
    visit_number = db.Column(db.Integer, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "visit_number": self.visit_number,
            "patient_id": self.patient_id
        }