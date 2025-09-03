import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const API_BASE = process.env.REACT_APP_BACKEND_API; // must end with /
const token = localStorage.getItem("userToken");

const axiosAuth = axios.create({
  baseURL: `${API_BASE}api/savabooking`,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

const DashboardStats = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalBookings = async () => {
      try {
        const res = await axiosAuth.get("/getAll");
        if (res.data?.data) {
          setTotalBookings(res.data.data.length); // ✅ count bookings
        }
      } catch (error) {
        console.error("Error fetching total bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalBookings();
  }, []);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h4>Total Bookings</h4>
        <p className="stat-value">
          {loading ? "Loading..." : totalBookings}
        </p>
      </div>

      <div className="stat-card">
        <h4>
          <Link to="/booksevaform">Book Seva</Link>
        </h4>
      </div>

      <div className="stat-card">
        <h4>
          <Link to="/sevabookings">View Seva</Link>
        </h4>
      </div>
    </div>
  );
};

export default DashboardStats;
