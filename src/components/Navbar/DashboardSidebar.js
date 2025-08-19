import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./DashboardSidebar.css";

import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaKey
} from "react-icons/fa";

const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth storage (adjust as per your app)
    localStorage.removeItem("token");
    sessionStorage.clear();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className={`dashboard-sidebar ${isOpen ? "open" : ""}`}>
      <nav className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          className="sidebar-link" 
          onClick={toggleSidebar}
        >
          <FaTachometerAlt className="sidebar-icon" /> Dashboard
        </NavLink>

        <NavLink 
          to="/changepassword" 
          className="sidebar-link" 
          onClick={toggleSidebar}
        >
          <FaKey className="sidebar-icon" /> Change Password
        </NavLink>

        <NavLink
          to="/logout"
          className="sidebar-link"
          onClick={(e) => {
            e.preventDefault(); // stop NavLink navigation
            toggleSidebar();
            handleLogout();
          }}
        >
          <FaSignOutAlt className="sidebar-icon" /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
