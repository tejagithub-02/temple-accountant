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
  const { id: bookingId } = useParams();
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
    from_booking_date,
    to_booking_date,
  } = bookingData;

  const sevaName = sava_id?.name || "N/A";
  const amount = sava_id?.price || 0;
  const category = sava_id?.category || "";

  // ✅ Handle dates differently
  let dateDisplay = "N/A";
  if (category === "Event-Specific Sevas" && sava_id?.date) {
    dateDisplay = new Date(sava_id.date).toLocaleDateString();
  } else if (category === "General Sevas") {
    if (from_booking_date && to_booking_date) {
      const fromDate = new Date(from_booking_date).toLocaleDateString();
      const toDate = new Date(to_booking_date).toLocaleDateString();
      dateDisplay = `${fromDate} → ${toDate}`;
    } else if (from_booking_date) {
      dateDisplay = new Date(from_booking_date).toLocaleDateString();
    }
  }
  

  const handleDownloadPDF = async () => {
    if (!bookingData) return;
  
    const element = ticketRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
  
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  
    // Format date as MM-DD-YYYY
    let pdfDate = "N/A";
    if (sava_id?.category === "Event-Specific Sevas" && sava_id?.date) {
      const d = new Date(sava_id.date);
      pdfDate = `${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}-${d.getFullYear()}`;
    } else if (sava_id?.category === "General Sevas" && from_booking_date) {
      const d = new Date(from_booking_date);
      pdfDate = `${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}-${d.getFullYear()}`;
    }
  
    const pdfName = `${sevaName} Poojs (${pdfDate}).pdf`;
    pdf.save(pdfName);
  };
  

const handlePrint = async () => {
  const element = ticketRef.current;
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  // Instead of saving, open print dialog
  const pdfBlob = pdf.output("bloburl");
  const printWindow = window.open(pdfBlob, "_blank");
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
};


  return (
    <div className="ticket-container">
      <div className="ticket-card" ref={ticketRef}>
        <div className="ticket-header">
          <h2> 💐 Seva Booking Confirmation 💐</h2>
        </div>

        <div className="ticket-body">
          <img src="/images/logo.png" alt="Temple Logo" className="ticket-logo" />

          <div className="ticket-details">
            <p><strong>Temple:</strong> Sri JayaRama Seva Mandali</p>
            <p><strong>Booking ID:</strong> {bookingId}</p>
            <p><strong>Karta Name:</strong> {name}</p>
            <p><strong>Mobile:</strong> {mobile}</p>
            <p><strong>Seva:</strong> {sevaName}</p>
            <p>
              <strong>{category === "General Sevas" ? "Booking Dates" : "Date"}:</strong>{" "}
              {dateDisplay}
            </p>
            <p><strong>Payment Method:</strong> {paymentMethod}</p>
            <p><strong>Gotra:</strong> {gotra}</p>
            <p><strong>Nakshatra:</strong> {nakshatra}</p>
            <p><strong>Rashi:</strong> {raashi}</p>
            <p><strong>District:</strong> {district}</p>
            <p><strong>State:</strong> {state}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Pincode:</strong> {pincode}</p>
          
            <p><strong>Amount:</strong> ₹{amount}</p>
          </div>
        </div>
      </div>

      <div className="ticket-footer">
        <button className="btn download" onClick={handleDownloadPDF}>
          ⬇ Download PDF
        </button>

        <button className="btn print" onClick={handlePrint}>
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
