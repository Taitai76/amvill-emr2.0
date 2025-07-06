// src/components/Chart/Chart.js
import React, { useState } from "react";
import "./Chart.css";
import HistoryTab from "./Tabs/HistoryTab";
import PhysicalExamTab from "./Tabs/PhysicalExamTab";
import ProgressTab from "./Tabs/ProgressTab";
import DischargeTab from "./Tabs/DischargeTab";
import NarrativeTab from "./Tabs/NarrativeTab";

function Chart({ patient }) {
  const [activeTab, setActiveTab] = useState("History");

  if (!patient) {
    return (
      <div className="chart-box">
        <p>No patient selected</p>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "History":
        return <HistoryTab patient={patient} />;
      case "Physical Exam":
        return <PhysicalExamTab patient={patient} />;
      case "Progress":
        return <ProgressTab patient={patient} />;
      case "Discharge":
        return <DischargeTab patient={patient} />;
      case "Narrative":
        return <NarrativeTab patient={patient} />;
      default:
        return null;
    }
  };

  return (
    <div className="chart-box">
      <div className="chart-tabs-wrapper">
        <div className="chart-tabs">
          {["History", "Physical Exam", "Progress", "Discharge"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="narrative-tab">
          <button
            className={activeTab === "Narrative" ? "tab active" : "tab"}
            onClick={() => setActiveTab("Narrative")}
          >
            Narrative
          </button>
        </div>
      </div>

      <div className="chart-content">{renderTabContent()}</div>
    </div>
  );
}

export default Chart;
