import React, { useRef } from "react";
import "./Ticket.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";


const Ticket = ({ bookingData = {}, onClose = () => {} }) => {
  const ticketRef = useRef();
  const navigate = useNavigate();


  // Dummy fallback data
  const defaultData = {
    name: "Thamba Maruthi Teja",
    mobile: "9618591044",
    email: "tmaruthiteja2013@gmail.com",
    sevaName: "Lakshmi Pooja",
    paymentMethod: "Online",
    gotra: "Kashyap",
    nakshatra: "Rohini",
    raashi: "Vrishabha",
    district: "Chittoor",
    state: "Andhra Pradesh",
    address: "123 Temple Road",
    pincode: "517001",
    date: "2025-08-20",
    amount: "1500",
  };

  const data = { ...defaultData, ...bookingData };

  const {
    name,
    mobile,
    email,
    sevaName,
    paymentMethod,
    gotra,
    nakshatra,
    raashi,
    district,
    state,
    address,
    pincode,
    date,
    amount,
  } = data;

  const bookingId =
    "SEVA-" + Math.random().toString(36).substring(2, 10).toUpperCase();

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
            <p><strong>Booking ID:</strong> <span className="booking-id">{bookingId}</span></p>
            <p><strong>Karta Name:</strong> {name}</p>
            <p><strong>Mobile:</strong> {mobile}</p>
            <p><strong>Email:</strong> {email}</p>
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
        <button className="btn download" onClick={handleDownloadPDF}>⬇ Download PDF</button>
        <button
  className="btn print"
  onClick={() => {
    const printContent = ticketRef.current;
    const printWindow = window.open("", "", "width=800,height=900");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Ticket</title>
          <style>
            ${document.querySelector("style")?.innerHTML || ""}
            ${Array.from(document.styleSheets)
              .map((sheet) => {
                try {
                  return Array.from(sheet.cssRules)
                    .map((rule) => rule.cssText)
                    .join("");
                } catch (e) {
                  return "";
                }
              })
              .join("")}
          </style>
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
