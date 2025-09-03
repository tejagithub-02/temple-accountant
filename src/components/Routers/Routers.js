import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import ChangePassword from "../Login/ChangePassword"; 
import BookSevaForm from "../Dashboard/BookSevaForm";
import Ticket from "../Dashboard/Ticket";
import SevaBookings from "../Dashboard/SevaBookings";
import Login from "../Login/Login"; // 👈 add Login page
import SignUp from "../Login/SignUp";

// Protect routes
const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const Routers = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <Router>
    <Routes>
      {/* Public - Login */}
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
  
      {/* Default root path → login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
  
      {/* Private - Dashboard + others */}
      <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="booksevaform" element={<BookSevaForm />} />
          <Route path="/ticket/:id" element={<Ticket />} />

          <Route path="sevabookings" element={<SevaBookings />} />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  </Router>
  
  );
};

export default Routers;
