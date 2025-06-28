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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Appointment Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Date & Time</label>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-md text-sm font-semibold transition"
        >
          ✅ Confirm Appointment
        </button>
      </form>

      {confirmation && (
        <div className="mt-6 bg-green-100 p-4 rounded-md text-sm text-gray-800">
          <h3 className="text-lg font-semibold mb-2">✅ Appointment Confirmed!</h3>
          <p>
            <span className="font-medium">Doctor:</span> {doctor.name}
          </p>
          <p>
            <span className="font-medium">Time:</span>{" "}
            {new Date(confirmation.time).toLocaleString()}
          </p>
          {confirmation.type === "online" ? (
            <p>
              <span className="font-medium">GMeet Link:</span>{" "}
              <a
                href={confirmation.link}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {confirmation.link}
              </a>
            </p>
          ) : (
            <p>
              <span className="font-medium">Address:</span> {confirmation.address}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
