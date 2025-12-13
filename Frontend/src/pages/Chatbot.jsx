import React from 'react';
import SymptomForm from '../components/HealthChatBot'; // adjust path if needed
import Navbar from '../components/Navbar';

const Home = () => {
  return (

    <>
      <Navbar />
    <div className="min-h-screen bg-gray-100">
      <SymptomForm />
    </div>
    </>
  );
};

export default Home;
