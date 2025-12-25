import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass =
    "text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors";

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        
        {/* Logo */}
        <div
          style={{ fontFamily: '"Baloo 2", cursive' }}
          className="text-2xl font-bold text-gray-900"
        >
          Burrow
        </div>

        {/* Center links */}
        <div className="hidden md:flex gap-12">
          <NavLink to="/home" className={linkClass}>Home</NavLink>
          <NavLink to="/chatbot" className={linkClass}>Chat</NavLink>
          <NavLink to="/buy-medicine" className={linkClass}>Buy Medicine</NavLink>
          <NavLink to="/book-tests" className={linkClass}>Book Tests</NavLink>
        </div>

        {/* Profile */}
        <NavLink to="/dashboard" className={linkClass}>
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
