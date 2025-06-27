import React from 'react'
import logo from '../assets/burrowlogo.png';
import bguber from '../assets/bg1.jpg';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div
      className='h-screen pt-8 flex justify-between flex-col w-full bg-cover bg-center'
      style={{ backgroundImage: `url(${bguber})` }} // ✅ Correct way to set background
    >
      <img className='w-18 ml-8'  src={logo} alt="Uber Logo" />
      <div className='bg-white pb-7 py-4 px-4'>
        <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
        <Link to='login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-7'>Continue</Link>
      </div>
    </div>
  );
};

export default Start;
