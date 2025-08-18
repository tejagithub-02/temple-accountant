import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";

import ChangePassword from "../Login/ChangePassword"; 
import BookSevaForm from "../Dashboard/BookSevaForm";
import Ticket from "../Dashboard/Ticket";
import SevaBookings from "../Dashboard/SevaBookings";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Default redirect */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Change Password */}
          <Route path="changepassword" element={<ChangePassword />} />

          {/* ✅ Corrected BookSevaForm path */}
          <Route path="booksevaform" element={<BookSevaForm />} />
          <Route path="ticket" element={<Ticket />} />
          <Route path="sevabookings" element={<SevaBookings />} />
          

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routers;
