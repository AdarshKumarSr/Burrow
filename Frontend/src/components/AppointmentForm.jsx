import React, { useState } from "react";
import axios from "axios";

const AppointmentForm = ({ doctor }) => {
  const [mode, setMode] = useState("online");
  const [datetime, setDatetime] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!datetime) {
      return setError("Please select date and time");
    }

    try {
      setLoading(true);

      const BASE_URL = import.meta.env.VITE_BASE_URL;

      // ✅ GET TOKEN FROM LOGIN
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BASE_URL}/appointments`,
        {
          doctorId: doctor._id || doctor.id,
          mode,
          scheduledAt: datetime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ THIS FIXES 401
          },
          withCredentials: true,
        }
      );

      setAppointment(res.data.appointment);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to book appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-cyan-100">
      <h2 className="text-2xl font-bold mb-4">
        📅 Book Appointment with Dr. {doctor.name}
      </h2>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-700 mb-1">
          <span className="font-medium">Specialty:</span> {doctor.specialty}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Location:</span> {doctor.location}
        </p>
      </div>

      {!appointment ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Appointment Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md"
          >
            {loading ? "Booking..." : "✅ Request Appointment"}
          </button>
        </form>
      ) : (
        <div className="mt-4 bg-green-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">
            ✅ Appointment Requested
          </h3>

          <p>
            <b>Status:</b> {appointment.status}
          </p>
          <p>
            <b>Time:</b>{" "}
            {new Date(appointment.scheduledAt).toLocaleString()}
          </p>

          {appointment.mode === "online" && (
            <p>
              <b>Meeting:</b>{" "}
              <a
                href={appointment.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Join Meeting
              </a>
            </p>
          )}

          {appointment.mode === "offline" && (
            <p>
              <b>Address:</b> {appointment.address}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
