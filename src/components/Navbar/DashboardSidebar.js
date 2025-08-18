import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./DashboardSidebar.css";

import {
  FaTachometerAlt,
 
  FaSignOutAlt,
 
  FaKey // <-- add this here
} from "react-icons/fa";


const DashboardSidebar = ({ isOpen, toggleSidebar }) => {
  // Existing submenu states
  
  
  return (
    <div className={`dashboard-sidebar ${isOpen ? "open" : ""}`}>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link" onClick={toggleSidebar}>
          <FaTachometerAlt className="sidebar-icon" /> Dashboard
        </NavLink>
       
        <NavLink to="/changepassword" className="sidebar-link" onClick={toggleSidebar}>
          <FaKey className="sidebar-icon" /> Change Password
        </NavLink>
        <NavLink to="/logout" className="sidebar-link" onClick={toggleSidebar}>
          <FaSignOutAlt className="sidebar-icon" /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
