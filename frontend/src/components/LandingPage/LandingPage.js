import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import logo from "./Amvill.png";

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };
  const handleDemoClick = () => {
    setShowDemoForm(true);
    setMenuOpen(false);
  };
  const closeDemoForm = () => {
    setShowDemoForm(false);
    setSubmitted(false);
    setSubmitError("");
  };

  // Close menu on outside click + close menu/modal on Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setShowDemoForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = showDemoForm ? "hidden" : "auto";
  }, [showDemoForm]);

  return (
    <div className="landing-page">
      <header className="landing-header sticky-header">
        <img src={logo} alt="Amvill EMR" className="landing-logo" />

        <div className="menu-wrapper" ref={menuRef}>
          <button
            className="menu-btn"
            onClick={toggleMenu}
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls="landing-menu"
          >
            ☰
          </button>

          {menuOpen && (
            <div className="dropdown-menu" id="landing-menu" role="menu">
              <button type="button" onClick={handleLogin} role="menuitem">
                Login
              </button>
              <button type="button" onClick={handleDemoClick} role="menuitem">
                Book a Demo
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="landing-content">
        <h1>Cut Charting Time in Half.</h1>
        <p>Let AI handle the busywork so you can focus on patient care.</p>

        <button className="cta-btn" onClick={handleDemoClick} type="button">
          Schedule a Demo
        </button>

        <div className="features">
          <div className="feature-card">
            <h3>AI‑Assisted Billing</h3>
            <p>
              Real‑time guidance to document the right level of service and
              capture compliant revenue—without extra clicks.
            </p>
          </div>

          <div className="feature-card">
            <h3>Modern, Clean UI</h3>
            <p>
              A clutter‑free interface built for speed: clear typography,
              sensible layouts, and fewer dialogs—so you can think clinically,
              not clicky.
            </p>
          </div>

          <div className="feature-card">
            <h3>AI Charting Tools</h3>
            <p>
              Smart templates, auto‑MDM generation, and contraindication checks
              help you draft accurate notes in minutes.
            </p>
          </div>

          <div className="feature-card">
            <h3>Less Time Charting</h3>
            <p>
              Keyboard‑first workflows, autosave, and visit summaries reduce
              after‑hours charting and keep you with patients, not paperwork.
            </p>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        © {new Date().getFullYear()} Amvill EMR. Built for providers, by
        providers.
      </footer>

      {showDemoForm && (
        <div
          className="demo-overlay"
          onClick={(e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
              closeDemoForm();
            }
          }}
        >
          <div
            className="demo-form"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
          >
            <h3 id="demo-title">Schedule a Demo</h3>

            {!submitted ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setSubmitError("");
                  const formData = new FormData(e.currentTarget);
                  try {
                    const res = await fetch("https://formspree.io/f/mvgqrwzw", {
                      method: "POST",
                      body: formData,
                      headers: { Accept: "application/json" },
                    });
                    if (!res.ok) throw new Error("Submit failed");
                    setSubmitted(true);
                  } catch (err) {
                    setSubmitError("Something went wrong. Please try again.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Tell us about your clinic..."
                  rows={4}
                />
                <div className="form-actions">
                  <button type="submit" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit"}
                  </button>
                  <button type="button" onClick={closeDemoForm}>
                    Cancel
                  </button>
                </div>
                {submitError && <p className="form-error">{submitError}</p>}
              </form>
            ) : (
              <div className="demo-success">
                <p>Thanks! We’ll be in touch shortly.</p>
                <button type="button" onClick={closeDemoForm}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
