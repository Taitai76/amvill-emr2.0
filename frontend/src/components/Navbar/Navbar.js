import "./Navbar.css"
import React from 'react'
import { NavLink } from "react-router-dom";
import logo from "./Amvill.png"

function Navbar() {
    return (
      <div className="header">
        <img className="nav-logo" src={logo} alt="logo" />
        <nav>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Settings
          </NavLink>
        </nav>
      </div>
    );
  }

export default Navbar;
