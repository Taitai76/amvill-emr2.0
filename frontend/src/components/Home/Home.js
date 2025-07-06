import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Chart from "../Chart/Chart";
import "./Home.css";
import PatientList from "../PatientList/PatientList";

function Home() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="patient-info">
        <PatientList onSelectPatient={setSelectedPatient} />
        <Chart patient={selectedPatient} />
      </div>
    </div>
  );
}

export default Home;
