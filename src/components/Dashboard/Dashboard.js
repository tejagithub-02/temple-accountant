import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./Dashboard.css";

const DashboardStats = () => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h4>WEBSITE VISITORS</h4>
        <p className="stat-value">1,245</p>
      </div>

      <div className="stat-card">
        <h4>Total Bookings</h4>
        <p className="stat-value">145</p>
      </div>
      <div className="stat-card">
        <h4>
            <Link to="/booksevaform">Book Seva</Link>
        </h4>
      </div>
      <div className="stat-card">
        <h4>
            <Link to="/sevabookings">view Seva</Link>
        </h4>
      </div>
    </div>
  );
};

export default DashboardStats;
