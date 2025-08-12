import React, { useState } from "react";
import "./AddPatientModal.css";

function AddPatientModal({ isOpen, onClose, onAddPatient }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const API = process.env.REACT_APP_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, dob, gender }),
    })
      .then((res) => res.json())
      .then((newPatient) => {
        onAddPatient(newPatient); // Add to list in parent
        onClose(); // Close modal
        setName("");
        setDob("");
        setGender("");
      })
      .catch((err) => console.error("Error adding patient:", err));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Patient</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            DOB:
            <input value={dob} onChange={(e) => setDob(e.target.value)} />
          </label>
          <label>
            Gender:
            <input value={gender} onChange={(e) => setGender(e.target.value)} />
          </label>
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPatientModal;
