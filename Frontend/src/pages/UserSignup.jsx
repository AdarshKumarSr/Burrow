import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const newUser = {
      fullname: {
        firstname: username,
        lastname: '',
      },
      email: email,
      password: password,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7fafd]">
      <div className="w-full max-w-2xl bg-transparent p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-2">Sign-up</h2>
        <div className="flex justify-center mb-8">
          <div className="border-b-2 border-gray-400 w-32"></div>
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <input
              type="text"
              placeholder="USERNAME"
              className="border-2 border-cyan-200 rounded-lg px-4 py-3 w-full uppercase text-sm focus:outline-none focus:border-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              className="border-2 border-cyan-200 rounded-lg px-4 py-3 w-full uppercase text-sm focus:outline-none focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="EMAIL"
              className="border-2 border-cyan-200 rounded-lg px-4 py-3 w-full uppercase text-sm focus:outline-none focus:border-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="CONFIRM PASSWORD"
              className="border-2 border-cyan-200 rounded-lg px-4 py-3 w-full uppercase text-sm focus:outline-none focus:border-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 text-black font-bold rounded-full px-10 py-2 text-base shadow hover:bg-gray-400 transition-all"
            >
              SIGN-UP
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center mt-8 gap-3">
          <span className="text-gray-500 text-sm">or sign up with</span>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-6 py-2 shadow hover:bg-gray-100 transition-all">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_17_40)">
                  <path d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24V29.1H37.1C36.5 32.1 34.6 34.6 31.8 36.3V42.1H39.5C44.1 38 47.5 31.9 47.5 24.5Z" fill="#4285F4"/>
                  <path d="M24 48C30.6 48 36.1 45.9 39.5 42.1L31.8 36.3C29.9 37.5 27.6 38.3 24 38.3C17.7 38.3 12.2 34.2 10.3 28.7H2.3V34.7C5.7 41.1 14.1 48 24 48Z" fill="#34A853"/>
                  <path d="M10.3 28.7C9.7 26.9 9.4 24.9 9.4 23C9.4 21.1 9.7 19.1 10.3 17.3V11.3H2.3C0.8 14.1 0 17.4 0 21C0 24.6 0.8 27.9 2.3 30.7L10.3 28.7Z" fill="#FBBC05"/>
                  <path d="M24 9.7C27.6 9.7 29.9 11.1 31.1 12.2L39.6 4.1C36.1 1.1 30.6 0 24 0C14.1 0 5.7 6.9 2.3 13.3L10.3 17.3C12.2 11.8 17.7 9.7 24 9.7Z" fill="#EA4335"/>
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="font-medium text-sm">Google</span>
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-6 py-2 shadow hover:bg-gray-100 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" fill="#1877F3"/>
                <path d="M16.671 24v-9.294h3.12l.467-3.622h-3.587V8.771c0-1.048.293-1.763 1.797-1.763l1.918-.001v-3.24c-.334-.044-1.472-.143-2.797-.143-2.766 0-4.659 1.688-4.659 4.788v2.13H9.692v3.622h3.128V24h3.851z" fill="#fff"/>
              </svg>
              <span className="font-medium text-sm">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
