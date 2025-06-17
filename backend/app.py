from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Patient

app = Flask(__name__)
CORS(app)  # Allows React frontend to connect

# Set up PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://emr_user:password@localhost/emr_dev'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route("/")
def index():
    return jsonify(message="Welcome to the AMVILL EMR API!")

#test Pts route
@app.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
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

if __name__ == "__main__":
    app.run(debug=True, host="localhost")

