import React from "react";
import { Link, useLocation } from "react-router-dom";

const DoctorNavbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `hover:text-[#1CB3A2] transition font-medium ${
      location.pathname === path
        ? "text-[#1CB3A2] border-b-2 border-[#1CB3A2] pb-1"
        : "text-gray-700"
    }`;

  return (
    <nav className="bg-white shadow-sm px-10 py-4 flex items-center relative">
      {/* Logo / Brand */}
      <div
        className="font-bold text-2xl absolute left-10"
        style={{ fontFamily: '"Baloo 2", cursive' }}
      >
        Burrow
      </div>

      {/* Center Links */}
      <div className="flex gap-14 mx-auto text-lg">
        <Link to="/doctor-home" className={linkClass("/doctor-home")}>
          Home
        </Link>

        <Link
          to="/doctor/appointments"
          className={linkClass("/doctor/appointments")}
        >
          Appointments
        </Link>
      </div>

      {/* Right Side */}
      <div className="absolute right-10">
        <Link
          to="/doctor/logout"
          className="text-sm font-semibold text-red-500 hover:text-red-600 transition"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
