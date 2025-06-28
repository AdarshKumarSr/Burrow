import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { email, password };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] pt-24 flex flex-col items-center px-4">
      <h2 className="text-3xl font-bold text-center mb-8 border-b-2 border-gray-400 pb-2 w-fit">
        Login
      </h2>

      <form
        onSubmit={submitHandler}
        className="bg-white rounded-xl shadow-md px-10 py-8 w-full max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL"
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-md transition mb-4"
        >
          LOGIN
        </button>

        <p className="text-center text-sm text-gray-600 mb-4">
          New here?{' '}
          <Link to="/Signup" className="text-blue-600 hover:underline font-medium">
            Create New Account
          </Link>
        </p>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm font-medium">or sign in with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition">
            <img src="https://img.icons8.com/color/20/google-logo.png" alt="Google" />
            <span className="text-sm font-medium">Google</span>
          </button>
          <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 transition">
            <img src="https://img.icons8.com/color/20/facebook-new.png" alt="Facebook" />
            <span className="text-sm font-medium">Facebook</span>
          </button>
        </div>
      </form>

      <Link
        to="/doctor-login"
        className="mt-6 bg-[#10b461] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#0e9d54] transition"
      >
        Sign In as Doctor
      </Link>
    </div>
  );
};

export default UserLogin;
