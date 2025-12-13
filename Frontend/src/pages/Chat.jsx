import React from 'react';
import HealthChatBot from '../components/HealthChatBot';
import Navbar from '../components/Navbar';

const Chat = () => {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gray-100">
      <HealthChatBot />
    </div>
    </>
  );
};

export default Chat; 