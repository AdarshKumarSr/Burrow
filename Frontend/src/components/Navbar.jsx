import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/burrow-logo1 1.png";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  // total items = sum of quantities
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const linkClass =
    "text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors";

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Burrow Logo"
            className="w-9 h-9 object-contain"
          />
          <span
            style={{ fontFamily: '"Baloo 2", cursive' }}
            className="text-2xl font-bold text-gray-900"
          >
            Burrow
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex gap-12 items-center">
          <NavLink to="/home" className={linkClass}>Home</NavLink>
          <NavLink to="/chatbot" className={linkClass}>Chat</NavLink>
          <NavLink to="/buy-medicine" className={linkClass}>Buy Medicine</NavLink>
          {/* <NavLink to="/book-tests" className={linkClass}>Book Tests</NavLink> */}

          {/* 🛒 Cart with badge */}
          <NavLink to="/cart" className="relative flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>
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
