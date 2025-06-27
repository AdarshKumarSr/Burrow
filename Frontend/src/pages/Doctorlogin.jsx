import React, { useState } from 'react';
import logo from '../assets/burrowlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { DoctorDataContext } from '../context/DoctorContext'; // ✅ updated context name
import axios from 'axios';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doctor, setDoctor } = React.useContext(DoctorDataContext); // ✅ context values updated
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/doctors/login`, credentials); // ✅ corrected route
      if (response.status === 200) {
        const data = response.data;
        setDoctor(data.doctor);
        localStorage.setItem('token', data.token);
        navigate('/doctor-home');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid email or password');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-15 mb-14' src={logo} alt="Burrow Logo" />
        <form onSubmit={submitHandler}>
          <h3 className='font-bold text-lg mb-2'>What's your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
            type='email'
            placeholder='email@example.com'
          />

          <h3 className='font-bold text-lg mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
            type='password'
            placeholder='password'
          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg'>
            Login
          </button>

          <p className='text-center'>
            Not a member? 
            <Link to='/doctor-signup' className='text-blue-600'> Register as a Doctor</Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg'
        >
          Sign In As User
        </Link>
      </div>
    </div>
  );
};

export default DoctorLogin;
