import React from 'react'
import './Chart.css'

function Chart({ patient }) {
  return (
    <div className="chart-box">
      {patient ? (
        <p>
          Viewing chart for <strong>{patient.name}</strong>
        </p>
      ) : (
        <p>Select a patient to view their chart.</p>
      )}
    </div>
  );
}

export default Chart
