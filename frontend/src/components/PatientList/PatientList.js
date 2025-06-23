import React, { useState, useEffect } from "react";
import "./PatientList.css";
import AddPatientModal from "../AddPatientModal/AddPatientModal";
import PatientSearch from "./PatientSearch";
import Chart from "../Chart/Chart";

function PatientList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const fetchPatients = () => {
    fetch("http://127.0.0.1:5000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Error fetching patients:", err));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  const handleDischarge = (id) => {
    fetch(`http://127.0.0.1:5000/patients/${id}/discharge`, {
      method: "PATCH",
    }).then((res) => {
      if (res.ok) {
        setPatients(patients.filter((p) => p.id !== id));
      } else {
        console.error("Failed to discharge patient");
      }
    });
  };

  return (
    <div className="patient-box">
      <div className="button-bar">
        <button
          className="add-patient-btn"
          onClick={() => setIsModalOpen(true)}
        >
          New Patient
        </button>
        <PatientSearch onActivate={(p) => setPatients([...patients, p])} />
      </div>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPatient={handleAddPatient}
      />

      <div className="patient-list">
        <ul>
          {patients.map((patient) => (
            <li
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={
                selectedPatient?.id === patient.id ? "selected-patient" : ""
              }
            >
              {patient.name}
              <button
                onClick={() => handleDischarge(patient.id)}
                className="discharge-btn"
              >
                Discharge
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Chart patient={selectedPatient} />
    </div>
  );
}

export default PatientList;
