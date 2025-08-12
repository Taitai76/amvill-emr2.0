import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./Amvill.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/home");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Amvill Logo" className="login-logo" />
        <h2>Welcome to Amvill</h2>
        <p className="login-subtext">
          Sign in to access your charting dashboard
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <button onClick={handleForgotPassword} className="forgot-password">
          Forgot password?
        </button>
      </div>
    </div>
  );
}

export default Login;
