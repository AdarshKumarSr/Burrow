import React from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7fafd]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome to the Burrow Portal</h2>
        <p className="text-gray-500">To access the portal, you need to choose a type of access.</p>
      </div>
      <div className="flex gap-10">
        {/* Doctor Button */}
        <button 
          onClick={() => navigate('/doctor-login')}
          className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition border border-gray-200"
        >
          <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="16" fill="#E3F2FD"/>
            <ellipse cx="32" cy="28" rx="12" ry="12" fill="#B0BEC5"/>
            <rect x="20" y="40" width="24" height="12" rx="6" fill="#90CAF9"/>
            <rect x="28" y="44" width="8" height="8" rx="4" fill="#fff"/>
          </svg>
          <span className="mt-4 text-sm font-medium text-gray-700">Continue as Doctor</span>
        </button>

        {/* Patient Button */}
        <button
          onClick={() => navigate('/login')}
          className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition border border-gray-200"
        >
          <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="16" fill="#E3F2FD"/>
            <ellipse cx="32" cy="28" rx="12" ry="12" fill="#90CAF9"/>
            <rect x="20" y="40" width="24" height="12" rx="6" fill="#B0BEC5"/>
            <rect x="28" y="44" width="8" height="8" rx="4" fill="#fff"/>
          </svg>
          <span className="mt-4 text-sm font-medium text-gray-700">Continue as Patient</span>
        </button>
      </div>
    </div>
  );
};

export default Start;
