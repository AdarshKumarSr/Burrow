import React from "react";
import DoctorNavbar from "../components/DoctorNav";
const appointments = [
  {
    id: 1,
    patient: "Aarav Sharma",
    date: "12 Sep 2025",
    time: "10:30 AM",
    type: "Video Consultation",
    status: "Upcoming",
  },
  {
    id: 2,
    patient: "Neha Verma",
    date: "12 Sep 2025",
    time: "12:00 PM",
    type: "In-Person",
    status: "Completed",
  },
  {
    id: 3,
    patient: "Rohan Patel",
    date: "13 Sep 2025",
    time: "09:15 AM",
    type: "Video Consultation",
    status: "Upcoming",
  },
];

const DoctorAppointments = () => {
  return (
    <>
      <DoctorNavbar />
   
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Appointments
        </h1>
        <p className="text-gray-500">
          Manage your upcoming and past consultations
        </p>
      </div>

      {/* Appointments List */}
      <div className="max-w-6xl mx-auto space-y-6">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white rounded-xl shadow-sm border p-6 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition"
          >
            {/* Left Info */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {appt.patient}
              </h3>

              <p className="text-sm text-gray-500">
                {appt.date} • {appt.time}
              </p>

              <p className="text-sm text-gray-600">
                Consultation Type:{" "}
                <span className="font-medium">{appt.type}</span>
              </p>
            </div>

            {/* Right Actions */}
            <div className="mt-5 md:mt-0 flex items-center gap-4">
              {/* Status Badge */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  appt.status === "Upcoming"
                    ? "bg-[#E7F8F6] text-[#1CB3A2]"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {appt.status}
              </span>

              {/* Action Button */}
              {appt.status === "Upcoming" ? (
                <button className="bg-[#1CB3A2] hover:bg-[#179a8b] text-white px-5 py-2 rounded-lg font-semibold transition">
                  Join
                </button>
              ) : (
                <button className="border border-gray-300 text-gray-600 px-5 py-2 rounded-lg cursor-not-allowed">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

     </>
  );
};

export default DoctorAppointments;
