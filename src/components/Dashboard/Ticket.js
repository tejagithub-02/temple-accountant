import React, { useRef, useState, useEffect } from "react";
import "./Ticket.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = process.env.REACT_APP_BACKEND_API; // must end with /
const token = localStorage.getItem("userToken");

const axiosAuth = axios.create({
  baseURL: `${API_BASE}api/savabooking`, 
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  },
});

const Ticket = ({ onClose = () => {} }) => {
  const ticketRef = useRef();
  const navigate = useNavigate();
  const { id: bookingId } = useParams(); // ✅ Get bookingId from route params
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch booking by ID
  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        const res = await axiosAuth.get(`/getById/${bookingId}`);
        if (res.data?.data) {
          setBookingData(res.data.data);
        } else {
          setBookingData(null);
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
        setBookingData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="ticket-container">
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="ticket-container">
        <p>No booking found for ID: {bookingId}</p>
        <button className="btn new" onClick={() => navigate("/dashboard")}>
          ➕ New Booking
        </button>
      </div>
    );
  }

  const {
    karta_name: name,
    phone: mobile,
   
    booking_type: paymentMethod,
    gotra,
    nakshatra,
    raashi,
    district,
    state,
    address,
    pincode,
   
    sava_id,
  } = bookingData;

    const sevaName = sava_id?.name || "N/A";
    const amount = sava_id?.price || 0;
    const date = sava_id?.date ? new Date(sava_id.date).toLocaleDateString() : "N/A";
 
 
    // ✅ Download as PDF
  const handleDownloadPDF = async () => {
    const element = ticketRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${bookingId}.pdf`);
  };

  return (
    <div className="ticket-container">
      <div className="ticket-card" ref={ticketRef}>
        <div className="ticket-header">
          <h2>🎉 Seva Booking Confirmation 🎉</h2>
        </div>

        <div className="ticket-body">
          <img src="/images/logo.png" alt="Temple Logo" className="ticket-logo" />

          <div className="ticket-details">
            <p><strong>Temple:</strong> Sri JayaRama Seva Mandali</p>
            <p><strong>Booking ID:</strong> {bookingId}</p>
            <p><strong>Karta Name:</strong> {name}</p>
            <p><strong>Mobile:</strong> {mobile}</p>      
            <p><strong>Seva:</strong> {sevaName}</p>
            <p><strong>Payment Method:</strong> {paymentMethod}</p>
            <p><strong>Gotra:</strong> {gotra}</p>
            <p><strong>Nakshatra:</strong> {nakshatra}</p>
            <p><strong>Rashi:</strong> {raashi}</p>
            <p><strong>District:</strong> {district}</p>
            <p><strong>State:</strong> {state}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Pincode:</strong> {pincode}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Amount:</strong> ₹{amount}</p>
          </div>
        </div>
      </div>

      <div className="ticket-footer">
        <button className="btn download" onClick={handleDownloadPDF}>
          ⬇ Download PDF
        </button>

        <button
          className="btn print"
          onClick={() => {
            const printContent = ticketRef.current;
            const printWindow = window.open("", "", "width=800,height=900");

            printWindow.document.write(`
              <html>
                <head>
                  <title>Print Ticket</title>
                </head>
                <body>
                  ${printContent.outerHTML}
                </body>
              </html>
            `);

            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
          }}
        >
          🖨 Print
        </button>

        <button className="btn new" onClick={() => navigate("/dashboard")}>
          ➕ New Booking
        </button>
      </div>
    </div>
  );
};

export default Ticket;
