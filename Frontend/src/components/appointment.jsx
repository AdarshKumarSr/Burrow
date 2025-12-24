import React, { useEffect, useState } from "react";
import AppointmentForm from "./AppointmentForm";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("selectedDoctors");
    if (data) {
      setDoctors(JSON.parse(data));
    }
  }, []);

  const handleConfirm = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] pt-24 px-6 md:px-12">
      <h2 className="text-3xl font-bold mb-6">📅 Book Appointment</h2>

      {selectedDoctor ? (
        <AppointmentForm doctor={selectedDoctor} />
      ) : doctors.length === 0 ? (
        <p className="text-gray-600">No doctors found.</p>
      ) : (
        <ul className="space-y-5">
          {doctors.map((doc) => (
            <li
              key={doc._id}   // ✅ FIX IS HERE
              className="bg-white p-6 rounded-xl shadow-sm border border-cyan-100"
            >
              <p className="text-lg font-semibold text-gray-800 mb-1">
                Dr. {doc.name}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-700">Specialty:</span>{" "}
                {doc.specialty}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium text-gray-700">Location:</span>{" "}
                {doc.location}
              </p>
              <button
                onClick={() => handleConfirm(doc)}
                className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-md transition"
              >
                ✅ Confirm Appointment
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookAppointment;
