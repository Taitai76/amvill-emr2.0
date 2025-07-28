
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import logo from "./Amvill.png";
import { useState } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch("https://formspree.io/f/mvgqrwzw", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          alert("Thank you! We'll contact you shortly.");
          setIsDemoOpen(false);
        } else {
          alert("Oops! Something went wrong.");
        }
      })
      .catch(() => alert("Error submitting form."));
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <img src={logo} alt="Amvill EMR" className="landing-logo" />
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </header>

      <main className="landing-content">
        <h1>Modern EMR. Minimal Training. Maximum Efficiency.</h1>
        <p>
          AMVILL is a fast, user-friendly charting platform built for providers
          in urgent and emergency care settings. Designed to reduce charting
          fatigue and improve accuracy, our system helps providers focus more on
          patients and less on paperwork.
        </p>

        <div className="features">
          <div className="feature-card">
            <h3>AI-Assisted Billing</h3>
            <p>
              Automatically guides providers to document to the appropriate
              level of service and maximize reimbursement.
            </p>
          </div>
          <div className="feature-card">
            <h3>Smart Chart Summaries</h3>
            <p>
              Each patient visit generates a clear, narrative summary that's
              easily digestible — even by outside specialists or hospitals.
            </p>
          </div>
          <div className="feature-card">
            <h3>Lab & Imaging Integration</h3>
            <p>
              Seamlessly imports labs and imaging from other systems and
              summarizes them for fast clinical review.
            </p>
          </div>
          <div className="feature-card">
            <h3>HIPAA Compliant</h3>
            <p>
              Every feature is built with patient privacy and regulatory
              compliance in mind — from login to discharge.
            </p>
          </div>
        </div>

        <button className="cta-btn" onClick={() => navigate("/login")}>
          Try It Now
        </button>

        <button className="demo-btn" onClick={() => setIsDemoOpen(true)}>
          Schedule a Demo
        </button>

        {isDemoOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Schedule a Demo</h2>
              <form onSubmit={handleDemoSubmit}>
                <input name="name" placeholder="Your Name" required />
                <input name="email" placeholder="Email" type="email" required />
                <input name="practice" placeholder="Practice Name" />
                <textarea name="message" placeholder="Optional message" />
                <div className="button-group">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setIsDemoOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className="landing-footer">
        © {new Date().getFullYear()} Amvill EMR. Built for providers, by
        providers.
      </footer>
    </div>
  );
}

export default LandingPage;
