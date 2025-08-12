
import React, { useState } from "react";
import "./PatientSearch.css";

function formatDOB(dob) {
  const [month, day, year] = dob.split("/");
  if (!month || !day || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function PatientSearch({ onActivate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [results, setResults] = useState([]);

  const API = process.env.REACT_APP_API_URL;
  
  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (name) queryParams.append("name", name);
    if (dob) queryParams.append("dob", formatDOB(dob));

    fetch(`${API}/patients/search?${queryParams}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch(console.error);
  };

  const handleActivate = (id) => {
    fetch(`${API}/patients/${id}/activate`, { method: "PATCH" })
      .then((res) => res.json())
      .then((updatedPatient) => {
        onActivate(updatedPatient);
        setResults(results.filter((p) => p.id !== id));
        setIsOpen(false);
      });
  };

  return (
    <>
      <button className="lookup-btn" onClick={() => setIsOpen(true)}>
        Lookup Patient
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Find Patient</h3>
            <input
              type="text"
              placeholder="Patient Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <div className="button-group">
              <button onClick={handleSearch}>Search</button>
              <button type="button" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>

            {results.length > 0 && (
              <ul>
                {results.map((p) => (
                  <li key={p.id}>
                    {p.name} ({p.dob}){" "}
                    <button onClick={() => handleActivate(p.id)}>
                      Activate
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PatientSearch;
