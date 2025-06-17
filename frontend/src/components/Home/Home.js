import React from 'react'
import Navbar from '../Navbar/Navbar'
import Chart from '../Chart/Chart'
import './Home.css'
import PatientList from '../PatientList/PatientList';
function Home() {
  return (
    <div >
      <Navbar />
      <div className="patient-info">
        <PatientList />
        <Chart />
      </div>
    </div>
  );
}

export default Home
