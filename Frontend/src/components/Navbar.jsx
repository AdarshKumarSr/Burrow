import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex items-center relative">
      <div style={{ fontFamily: '"Baloo 2", cursive' }} className="font-bold text-xl absolute left-8">Burrow</div>
      <div className="flex gap-16 mx-auto">
        <Link to="/home" className="hover:text-blue-600">Home</Link>
        <Link to="/chatbot" className="hover:text-blue-600">Chat</Link>
        {/* <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link> */}
        <Link to="/buy-medicine" className="hover:text-blue-600">Buy Medicine</Link>
        <Link to="/book-tests" className="hover:text-blue-600">Book Tests</Link>
      </div>
      <div className="absolute right-8">
        <Link to="/dashboard" className="hover:text-blue-600">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar; 