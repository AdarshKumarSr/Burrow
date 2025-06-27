import React, { useEffect, useState } from "react";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("selectedDoctors");
    if (data) {
      setDoctors(JSON.parse(data));
    }
  }, []);

  const handleConfirm = (doctor) => {
    alert(`✅ Appointment confirmed with Dr. ${doctor.name}`);
    // You can redirect, open a modal, or send data to the backend here
  };

  return (
    <div style={styles.page}>
      <h2>📅 Book Appointment</h2>
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <ul style={styles.list}>
          {doctors.map((doc, i) => (
            <li key={i} style={styles.card}>
              <p><strong>Name:</strong> {doc.name}</p>
              <p><strong>Specialty:</strong> {doc.specialty}</p>
              <p><strong>Location:</strong> {doc.location}</p>
              <button style={styles.button} onClick={() => handleConfirm(doc)}>
                ✅ Confirm Appointment
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    fontFamily: "sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  list: {
    padding: 0,
    listStyle: "none",
  },
  card: {
    background: "#ffffff",
    padding: "16px",
    borderRadius: "10px",
    marginBottom: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#0077ff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default BookAppointment;
