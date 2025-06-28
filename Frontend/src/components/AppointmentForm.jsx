import React, { useState } from "react";

const AppointmentForm = ({ doctor }) => {
  const [mode, setMode] = useState("online");
  const [datetime, setDatetime] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const generateGMeetLink = () => {
    const random = () => Math.random().toString(36).substring(2, 6);
    return `https://meet.google.com/${random()}-${random()}-${random()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!datetime) return alert("Please select date and time");

    if (mode === "online") {
      setConfirmation({
        type: "online",
        link: generateGMeetLink(),
        time: datetime,
      });
    } else {
      setConfirmation({
        type: "offline",
        address: "123 Health St, Wellness City",
        time: datetime,
      });
    }
  };

  return (
    <div style={styles.container}>
      <h2>📅 Book Appointment with Dr. {doctor.name}</h2>
      <div style={styles.card}>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Location:</strong> {doctor.location}</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Appointment Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={styles.input}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>

        <label style={styles.label}>Date & Time:</label>
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>✅ Confirm Appointment</button>
      </form>

      {confirmation && (
        <div style={styles.confirmation}>
          <h3>✅ Appointment Confirmed!</h3>
          <p><strong>Doctor:</strong> {doctor.name}</p>
          <p><strong>Time:</strong> {new Date(confirmation.time).toLocaleString()}</p>
          {confirmation.type === "online" ? (
            <p><strong>GMeet Link:</strong> <a href={confirmation.link} target="_blank" rel="noopener noreferrer">{confirmation.link}</a></p>
          ) : (
            <p><strong>Address:</strong> {confirmation.address}</p>
          )}
        </div>
      )}
    </div>
  );
};

// 🔽 Add this line to enable importing it elsewhere
export default AppointmentForm;

// Optional: add your styles object here if not already defined.
const styles = {
  container: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "0 auto",
  },
  card: {
    marginBottom: "20px",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "6px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
  },
  input: {
    marginBottom: "16px",
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 16px",
    fontSize: "16px",
    backgroundColor: "#0077ff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  confirmation: {
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "#e0ffe0",
    borderRadius: "8px",
  },
};
