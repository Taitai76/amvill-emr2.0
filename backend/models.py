from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Patient(db.Model):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    dob = db.Column(db.String(10))  # or use db.Date
    gender = db.Column(db.String(10))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "dob": self.dob,
            "gender": self.gender
        }
