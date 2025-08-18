import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import "./BookSevaForm.css"; // custom styles

const BookSevaForm = () => {
  const navigate = useNavigate(); // ✅ for navigation

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    date: "",
    sevaName: "",
    paymentMethod: "",
    gotra: "",
    nakshatra: "",
    raashi: "",
    district: "",
    state: "",
    address: "",
    pincode: "",
    amount: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Redirect to TicketPage with formData
    navigate("/ticket", { state: { bookingData: formData } });

    // Reset form
    setSubmitted(true);
    setFormData({
      name: "",
      mobile: "",
      email: "",
      date: "",
      sevaName: "",
      paymentMethod: "",
      gotra: "",
      nakshatra: "",
      raashi: "",
      district: "",
      state: "",
      address: "",
      pincode: "",
      amount: ""
    });
  };

  // ✅ Close button handler
  const handleClose = () => {
    navigate("/dashboard"); // redirect to Dashboard.js
  };

  return (
    <div className="book-seva">
      {/* Close Button */}
      <button className="close-btn" onClick={handleClose}>✖</button>

      <h2 className="form-title">Book Seva (Manual)</h2>

      {submitted && <p className="success-msg">✅ Booking submitted successfully!</p>}

      <form onSubmit={handleSubmit} className="seva-form">
     
        {/* Form Fields */}
        <label>Karta's Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Mobile Number</label>
        <input
          type="text"
          name="mobile"
          placeholder="Enter mobile number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <label>Email *</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label>Seva Name</label>
        <input
          type="text"
          name="sevaName"
          placeholder="Enter seva name"
          value={formData.sevaName}
          onChange={handleChange}
        />

        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Online">Online</option>
        
        </select>

        <label>Gotra</label>
        <input
          type="text"
          name="gotra"
          placeholder="Enter gotra"
          value={formData.gotra}
          onChange={handleChange}
        />

        <label>Karta Nakshatra</label>
        <input
          type="text"
          name="nakshatra"
          placeholder="Enter nakshatra"
          value={formData.nakshatra}
          onChange={handleChange}
        />

        <label>Raashi</label>
        <input
          type="text"
          name="raashi"
          placeholder="Enter raashi"
          value={formData.raashi}
          onChange={handleChange}
        />

        <label>District</label>
        <input
          type="text"
          name="district"
          placeholder="Enter district"
          value={formData.district}
          onChange={handleChange}
        />

        <label>State</label>
        <input
          type="text"
          name="state"
          placeholder="Enter state"
          value={formData.state}
          onChange={handleChange}
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
        />

        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          placeholder="Enter pincode"
          value={formData.pincode}
          onChange={handleChange}
        />

        <label>Amount (₹)</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookSevaForm;
