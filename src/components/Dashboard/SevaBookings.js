import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import "./SevaBookings.css";

const SevaBookings = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    sevaName: "",
    paymentMethod: "All Methods",
  });

  const bookingsData = [
    {
      id: 1,
      bookingId: "B001",
      kartaName: "Ramesh",
      mobile: "9876543210",
      email: "ramesh@example.com",
      seva: "Lakshmi Pooja",
      paymentMethod: "Cash",
      gotra: "Kashyap",
      nakshatra: "Ashwini",
      rashi: "Mesha",
      district: "Hyderabad",
      state: "Telangana",
      address: "Madhapur",
      pincode: "500081",
      date: "2025-08-10",
      amount: 1500,
    },
    {
      id: 2,
      bookingId: "B002",
      kartaName: "Suresh",
      mobile: "9123456789",
      email: "suresh@example.com",
      seva: "Satyanarayana Vratham",
      paymentMethod: "Online",
      gotra: "Bharadwaj",
      nakshatra: "Rohini",
      rashi: "Vrishabha",
      district: "Chennai",
      state: "Tamil Nadu",
      address: "T Nagar",
      pincode: "600017",
      date: "2025-08-15",
      amount: 2500,
    },
    {
      id: 3,
      bookingId: "B003",
      kartaName: "Teja",
      mobile: "9618591044",
      email: "teja@example.com",
      seva: "Ganapathi Homam",
      paymentMethod: "Cash",
      gotra: "Vasishta",
      nakshatra: "Revati",
      rashi: "Meena",
      district: "Bangalore",
      state: "Karnataka",
      address: "Whitefield",
      pincode: "560066",
      date: "2025-08-18",
      amount: 1800,
    },
  ];

  // Filtering
  const filteredData = useMemo(() => {
    return bookingsData.filter((b) => {
      const fromCheck = filters.fromDate ? new Date(b.date) >= new Date(filters.fromDate) : true;
      const toCheck = filters.toDate ? new Date(b.date) <= new Date(filters.toDate) : true;
      const sevaCheck = filters.sevaName
        ? b.seva.toLowerCase().includes(filters.sevaName.toLowerCase())
        : true;
      const paymentCheck =
        filters.paymentMethod === "All Methods" || b.paymentMethod === filters.paymentMethod;

      return fromCheck && toCheck && sevaCheck && paymentCheck;
    });
  }, [filters, bookingsData]);

  // Total Amount
  const totalAmount = filteredData.reduce((sum, b) => sum + b.amount, 0);

  // Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleReset = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      sevaName: "",
      paymentMethod: "All Methods",
    });
  };

  // CSV Download
  const handleDownloadCSV = () => {
    if (filteredData.length === 0) {
      alert("No data to download!");
      return;
    }

    const headers = [
      "S.No",
      "Booking ID",
      "Karta Name",
      "Mobile",
      "Email",
      "Seva",
      "Payment Method",
      "Gotra",
      "Nakshatra",
      "Rashi",
      "District",
      "State",
      "Address",
      "Pincode",
      "Date",
      "Amount",
    ];

    const rows = filteredData.map((b, index) => [
      index + 1,
      b.bookingId,
      b.kartaName,
      b.mobile,
      b.email,
      b.seva,
      b.paymentMethod,
      b.gotra,
      b.nakshatra,
      b.rashi,
      b.district,
      b.state,
      b.address,
      b.pincode,
      b.date,
      b.amount,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "Seva_Bookings.csv";
    link.click();
  };

  // Back to Dashboard
  const handleBack = () => {
    navigate("/dashboard"); // change path if needed
  };

  return (
    <div className="seva-bookings-container">
      <h2 className="title">View Seva Bookings</h2>

      {/* Filters */}
      <div className="filters">
        <input type="date" name="fromDate" value={filters.fromDate} onChange={handleChange} />
        <input type="date" name="toDate" value={filters.toDate} onChange={handleChange} />
        <input
          type="text"
          name="sevaName"
          placeholder="Enter seva name"
          value={filters.sevaName}
          onChange={handleChange}
        />
        <select name="paymentMethod" value={filters.paymentMethod} onChange={handleChange}>
          <option>All Methods</option>
          <option>Cash</option>
          <option>Online</option>
        </select>
        <button className="apply-btn">Apply Filters</button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Total Amount */}
      <div className="total-amount">
        <strong>Total Amount: </strong>
        <span>₹{totalAmount.toLocaleString()}</span>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Booking ID</th>
              <th>Karta Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Seva</th>
              <th>Payment Method</th>
              <th>Gotra</th>
              <th>Nakshatra</th>
              <th>Rashi</th>
              <th>District</th>
              <th>State</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((b, index) => (
                <tr key={b.id}>
                  <td>{index + 1}</td>
                  <td>{b.bookingId}</td>
                  <td>{b.kartaName}</td>
                  <td>{b.mobile}</td>
                  <td>{b.email}</td>
                  <td>{b.seva}</td>
                  <td>{b.paymentMethod}</td>
                  <td>{b.gotra}</td>
                  <td>{b.nakshatra}</td>
                  <td>{b.rashi}</td>
                  <td>{b.district}</td>
                  <td>{b.state}</td>
                  <td>{b.address}</td>
                  <td>{b.pincode}</td>
                  <td>{b.date}</td>
                  <td>₹{b.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" style={{ textAlign: "center", color: "gray" }}>
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="actions">
        <button className="download-btn" onClick={handleDownloadCSV}>
          Download CSV
        </button>
        <button className="back-btn" onClick={handleBack}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SevaBookings;
