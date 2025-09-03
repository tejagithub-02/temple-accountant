import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookSevaForm.css";

const API_BASE = process.env.REACT_APP_BACKEND_API; // must end with /
const token = localStorage.getItem("userToken");

const axiosAuth = axios.create({
  baseURL: `${API_BASE}api/savabooking`, 
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

const BookSevaForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    date: "",
    sevaType: "",
    sevaName: "",
    booking_type: "",
    gotra: "",
    nakshatra: "",
    raashi: "",
    district: "",
    state: "",
    address: "",
    pincode: "",
    amount: "",
    status: "approved",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sevas, setSevas] = useState([]);
  const [filteredSevas, setFilteredSevas] = useState([]);
  const [selectedSeva, setSelectedSeva] = useState(null);

  // ✅ Fetch Sevas
  useEffect(() => {
    const fetchSevas = async () => {
      try {
        const res = await axios.get(`${API_BASE}api/sava/getAllSevas`);
        if (res.data.success) {
          setSevas(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching sevas:", error);
      }
    };
    fetchSevas();
  }, []);

  // ✅ Filter based on type
  useEffect(() => {
    if (formData.sevaType) {
      setFilteredSevas(sevas.filter((s) => s.category === formData.sevaType));
    } else {
      setFilteredSevas([]);
    }
  }, [formData.sevaType, sevas]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Seva Selection
  const handleSevaSelect = (e) => {
    const sevaId = e.target.value;
    const seva = filteredSevas.find((s) => s._id === sevaId);

    setSelectedSeva(seva || null);

    if (seva) {
      setFormData((prev) => ({
        ...prev,
        sevaName: seva.name,
        amount: seva.price || "",
        date:
          seva.category === "Event-Specific Sevas" && seva.date
            ? seva.date.split("T")[0]
            : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        sevaName: "",
        amount: "",
        date: "",
      }));
    }
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      karta_name: formData.name,
      phone: formData.mobile,
      email: formData.email,
      date: formData.date,
      sava_id: selectedSeva?._id,
      booking_type: formData.booking_type,
      gotra: formData.gotra,
      nakshatra: formData.nakshatra,
      raashi: formData.raashi,
      district: formData.district,
      state: formData.state,
      address: formData.address,
      pincode: formData.pincode,
      amount: formData.amount,
      status: formData.status,
    };

    console.log("➡️ Posting booking:", payload);
    console.log("➡️ API URL:", `${API_BASE}api/savabooking/create`);

    try {
      const res = await axiosAuth.post("/create", payload);
      console.log("✅ Booking created:", res.data);
      
      const newBookingId = res.data?.data?._id; // ✅ backend returns created booking ID
      if (newBookingId) {
        navigate(`/ticket/${newBookingId}`); // ✅ go to Ticket page with ID
      } else {
        alert("Booking created but ID missing!");
      }
      
      setSubmitted(true);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        date: "",
        sevaType: "",
        sevaName: "",
        booking_type: "",
        gotra: "",
        nakshatra: "",
        raashi: "",
        district: "",
        state: "",
        address: "",
        pincode: "",
        amount: "",
        status: "approved",
      });
      setSelectedSeva(null);
    } catch (error) {
      if (error.response) {
        console.error("❌ Backend error:", error.response.status, error.response.data);
        alert(`Failed: ${error.response.data.message || "Booking error"}`);
      } else {
        console.error("❌ Request error:", error.message);
        alert("Failed to submit booking. Please try again.");
      }
    }
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="book-seva">
      <button className="close-btn" onClick={handleClose}>
        ✖
      </button>

      <h2 className="form-title">Book Seva (Manual)</h2>

      {submitted && (
        <p className="success-msg">✅ Booking submitted successfully!</p>
      )}

      <form onSubmit={handleSubmit} className="seva-form">
        {/* Seva Type */}
        <label>Seva Type</label>
        <select
          name="sevaType"
          value={formData.sevaType}
          onChange={handleChange}
          required
        >
          <option value="">Select Seva Type</option>
          <option value="General Sevas">General Sevas</option>
          <option value="Event-Specific Sevas">Event-Specific Sevas</option>
        </select>

        {/* Seva Name */}
        <label>Seva Name</label>
        <select
          name="sevaName"
          value={selectedSeva?._id || ""}
          onChange={handleSevaSelect}
          required
        >
          <option value="">Select Seva</option>
          {filteredSevas.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} (₹{s.price})
            </option>
          ))}
        </select>

        {/* Name */}
        <label>Karta's Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter full name"
          onChange={handleChange}
          required
        />

        {/* Mobile */}
        <label>Mobile Number</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          placeholder="Enter mobile number"
          onChange={handleChange}
          required
        />

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />

        {/* Date */}
        <label>Date</label>
        {selectedSeva &&
        selectedSeva.category === "Event-Specific Sevas" &&
        selectedSeva.date ? (
          <input type="text" value={formData.date} readOnly />
        ) : (
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        )}

       
        <label>Payment Method</label>
        <select
          name="booking_type"
          value={formData.booking_type}
          onChange={handleChange}
        >
          <option value="">Select Payment Method</option>
          <option value="offline">Cash</option>
          <option value="UPI">UPI</option>
        </select>

        {/* Gotra */}
        <label>Gotra</label>
        <input
          type="text"
          name="gotra"
          value={formData.gotra}
          placeholder="Enter gotra"
          onChange={handleChange}
        />

        {/* Nakshatra */}
        <label>Karta Nakshatra</label>
        <input
          type="text"
          name="nakshatra"
          value={formData.nakshatra}
          placeholder="Enter nakshatra"
          onChange={handleChange}
        />

        {/* Raashi */}
        <label>Raashi</label>
        <input
          type="text"
          name="raashi"
          value={formData.raashi}
          placeholder="Enter raashi"
          onChange={handleChange}
        />

        {/* District */}
        <label>District</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          placeholder="Enter district"
          onChange={handleChange}
        />

        {/* State */}
        <label>State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          placeholder="Enter state"
          onChange={handleChange}
        />

        {/* Address */}
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          placeholder="Enter address"
          onChange={handleChange}
        />

        {/* Pincode */}
        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          placeholder="Enter pincode"
          onChange={handleChange}
        />

        {/* Amount */}
        <label>Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          placeholder="Enter amount"
          onChange={handleChange}
          readOnly={!!selectedSeva}
        />

        <button type="submit" className="submit-btn">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookSevaForm;
