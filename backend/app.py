from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Patient
from flask_migrate import Migrate


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Set up PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://emr_user:password@localhost/emr_dev'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

migrate = Migrate(app, db)

@app.route("/")
def index():
    return jsonify(message="Welcome to the AMVILL EMR API!")

#test Pts route
@app.route('/patients', methods=['GET'])
def get_active_patients():
    patients = Patient.query.filter_by(is_active=True).all()
    return jsonify([p.to_dict() for p in patients])

@app.route("/patients", methods=["POST"])
def add_patient():
    data = request.get_json()
    name = data.get("name")
    dob = data.get("dob")
    gender = data.get("gender")

    if not name:
        return jsonify({"error": "Name is required"}), 400

    new_patient = Patient(name=name, dob=dob, gender=gender)
    db.session.add(new_patient)
    db.session.commit()

    return jsonify(new_patient.to_dict()), 201

@app.route("/patients/<int:patient_id>/activate", methods=["PATCH"])
def activate_patient(patient_id):
    patient = Patient.query.get(patient_id)
    if not patient:
        return jsonify({"error": "Patient not found"}), 404

    patient.is_active = True
    db.session.commit()

    return jsonify(patient.to_dict()), 200

@app.route("/patients/search", methods=["GET"])
def search_patients():
    name = request.args.get("name", "")
    dob = request.args.get("dob", "")

    print("Searching for name:", name)
    print("Searching for dob:", dob)

    query = Patient.query.filter(Patient.is_active == False)

    if name:
        query = query.filter(Patient.name.ilike(f"%{name}%"))
    if dob:
        query = query.filter(Patient.dob == dob)

    results = query.all()
    return jsonify([p.to_dict() for p in results])

@app.route("/patients/<int:patient_id>/discharge", methods=["PATCH"])
def discharge_patient(patient_id):
    patient = Patient.query.get(patient_id)
    if not patient:
        return jsonify({"error": "Patient not found"}), 404

    patient.is_active = False
    db.session.commit()

    return jsonify({"message": f"Patient {patient_id} discharged."}), 200

@app.route("/visits", methods=["POST"])
def create_visit():
    data = request.get_json()
    patient_id = data.get("patient_id")

    if not patient_id:
        return jsonify({"error": "Patient ID is required"}), 400

    # Get the current visit count for the patient
    visit_count = Visit.query.filter_by(patient_id=patient_id).count()
    new_visit_number = visit_count + 1

    visit = Visit(visit_number=new_visit_number, patient_id=patient_id)
    db.session.add(visit)
    db.session.commit()

    return jsonify(visit.to_dict()), 201

if __name__ == "__main__":
    app.run(debug=True, host="localhost")

