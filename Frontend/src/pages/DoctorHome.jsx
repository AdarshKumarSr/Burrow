import React from "react";
import { Link } from "react-router-dom";
import DoctorNavbar from "../components/DoctorNav"; // ✅ Doctor Nav
import logo from "../assets/burrow-logo1 1.png";

const DoctorHome = () => {
  return (
    <>
      {/* ✅ Doctor Navbar */}
      <DoctorNavbar />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        {/* Logo */}
        <div className="mb-6 mt-4">
          <img
            src={logo}
            alt="Burrow Logo"
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Title */}
        <h1
          className="text-4xl font-bold text-black mb-2"
          style={{ fontFamily: '"Baloo 2", cursive' }}
        >
          Doctor Dashboard
        </h1>

        {/* Tagline */}
        <p
          className="text-[#1CB3A2] text-lg italic mb-10 text-center"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Care with confidence
        </p>

        {/* Quick Actions */}
        <div className="flex gap-6 flex-col sm:flex-row mb-16">
          <Link
            to="/doctor/appointments"
            className="bg-[#1CB3A2] hover:bg-[#179a8b] text-white font-semibold py-3 px-10 rounded-xl shadow-md text-lg transition"
          >
            View Appointments
          </Link>

          <Link
            to="/doctor/profile"
            className="border-2 border-[#1CB3A2] hover:bg-[#e7f8f6] text-[#1CB3A2] font-semibold py-3 px-10 rounded-xl shadow-md text-lg transition"
          >
            Edit Profile
          </Link>
        </div>

        {/* Features Section */}
        <section className="w-full max-w-6xl text-center mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to manage patients
          </h2>
          <p className="text-lg text-gray-500 mb-14 max-w-2xl mx-auto">
            Simple tools to help you consult, manage schedules, and deliver better
            care.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
            {/* Card 1 */}
            <Link
              to="/doctor/appointments"
              className="bg-white border rounded-xl shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="flex justify-center mb-5">
                <div className="w-10 h-10 bg-blue-500 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Appointments</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                View upcoming consultations, manage time slots, and track
                completed visits.
              </p>
            </Link>

            {/* Card 2 */}
            <Link
              to="/doctor/patients"
              className="bg-white border rounded-xl shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="flex justify-center mb-5">
                <div className="w-10 h-10 bg-green-500 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Patients</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Access patient profiles, medical history, and consultation notes
                securely.
              </p>
            </Link>

            {/* Card 3 */}
            <Link
              to="/doctor/schedule"
              className="bg-white border rounded-xl shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="flex justify-center mb-5">
                <div className="w-10 h-10 bg-purple-500 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Schedule</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Set availability, manage breaks, and keep your day organized
                effortlessly.
              </p>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#F6FAFD] w-full py-16 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-900">
            Your impact on Burrow
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm py-6">
              <p className="text-2xl font-semibold text-[#1CB3A2]">120+</p>
              <p className="text-gray-500 text-sm mt-1">Patients</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm py-6">
              <p className="text-2xl font-semibold text-[#1CB3A2]">45</p>
              <p className="text-gray-500 text-sm mt-1">Appointments</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm py-6">
              <p className="text-2xl font-semibold text-[#1CB3A2]">4.9</p>
              <p className="text-gray-500 text-sm mt-1">Rating</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm py-6">
              <p className="text-2xl font-semibold text-[#1CB3A2]">3+</p>
              <p className="text-gray-500 text-sm mt-1">Years</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1CB3A2] py-14 text-center w-full text-white">
          <h2 className="text-3xl font-bold mb-3">
            Ready for your next consultation?
          </h2>
          <p className="text-lg mb-6">
            Your patients are waiting for you.
          </p>
          <Link
            to="/doctor/appointments"
            className="bg-white text-[#1CB3A2] hover:bg-gray-100 font-semibold py-3 px-6 rounded-full transition"
          >
            Go to Appointments →
          </Link>
        </section>
      </div>
    </>
  );
};

export default DoctorHome;
