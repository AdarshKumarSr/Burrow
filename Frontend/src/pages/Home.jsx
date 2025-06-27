import React from 'react';
import { Link } from 'react-router-dom';
import SymptomForm from '../components/HealthChatBot'; // adjust path if needed

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Home</h1>

      <Link 
        to="/chatbot" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
      >
        Go to Chatbot
      </Link>
    </div>
  );
};

export default Home;
