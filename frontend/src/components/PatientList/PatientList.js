import React, { useState, useEffect } from "react";
import "./PatientList.css";
import AddPatientModal from "../AddPatientModal/AddPatientModal";

function PatientList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);

  // Fetch patients 
  useEffect(() => {
    fetch("http://127.0.0.1:5000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  const handleAddPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  return (
    <div className="patient-box">
      <button className="add-patient-btn" onClick={() => setIsModalOpen(true)}>
        Add Patient
      </button>
      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPatient={handleAddPatient}
      />
      <div className="patient-list">
        <ul>
          {patients.map((patient, index) => (
            <li key={index}>{patient.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PatientList;
