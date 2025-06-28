import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import React, { useState, } from 'react'
import logo from '../assets/burrowlogo.png';
import { data, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {UserDataContext} from '../context/UserContext';

const UserSignup = () => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setuserData] = useState({})

  const navigate = useNavigate()

  const {user , setUser} = React.useContext(UserDataContext)
  
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    e.preventDefault()
    const newUser = {
      fullname:{
         firstname:firstName,
         lastname:lastName,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong. Please try again.');
    }

    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

       email: email,
       password: password
   }

   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

   if (response.status === 201) {
    const data = response.data
    setUser(data.user)
    localStorage.setItem('token', data.token)
    navigate('/home')
   }
    // console.log(userData);
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    // Handle form submission logic here
  }
  return (
    <div className="min-h-screen bg-[#f4f8fc] pt-24 flex flex-col items-center px-4">
      <h2 className="text-3xl font-bold text-center mb-8 border-b-2 border-gray-400 pb-2 w-fit">
        Sign-up
      </h2>

      <form
        onSubmit={submitHandler}
        className="bg-white rounded-xl shadow-md px-10 py-8 w-full max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm uppercase"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm uppercase"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm uppercase"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm uppercase"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-md transition mb-4"
        >
          SIGN UP
        </button>

        <p className="text-center text-sm text-gray-600 mb-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>

        <div className="flex flex-col items-center mt-6 gap-3">
          <span className="text-gray-500 text-sm">or sign up with</span>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-6 py-2 shadow hover:bg-gray-100 transition-all">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
              <span className="font-medium text-sm">Google</span>
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-6 py-2 shadow hover:bg-gray-100 transition-all">
              <img src="https://www.svgrepo.com/show/157818/facebook.svg" className="w-5 h-5" />
              <span className="font-medium text-sm">Facebook</span>
            </button>
          </div>
        </div>
      </form>
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-15 mb-14'  src={logo} alt="Uber Logo" />
    <form onSubmit={(e)=>{
      submitHandler(e)
    }} >
         <h3 className='font-bold text-base mb-2'> What's your Name  </h3>
         <div className='flex gap-4 mb-6'>
         <input 
          required 
          className='bg-[#eee]   rounded px-4 py-2   w-1/2 text-base placeholder:text-sm'
          type='text' placeholder='First Name'
          value={firstName}
          onChange={(e)=>{
            setFirstName(e.target.value)
          }}
          />

          <input  
          className='bg-[#eee]  rounded px-4 py-2   w-1/2 text-base placeholder:text-sm'
          type='text' placeholder='Last Name'
          value={lastName}
          onChange={(e)=>{
          setLastName(e.target.value)
          }} />

          
         </div>

    <h3 className='font-bold text-base mb-2'> What's your Email  </h3>
    <input 
    required 
    className='bg-[#eee] mb-5 rounded px-4 py-2   w-full text-base placeholder:text-sm'
    type='email' placeholder='email@example.com'
    value={email}
    onChange={(e)=>{
    setEmail(e.target.value)
    }}
    />

    <h3 className='font-bold text-base mb-2'> Enter Password</h3>
    <input 
    required
    
     className=' bg-[#eee] mb-5 rounded px-4 py-2   w-full text-base placeholder:text-sm'
    type='password' placeholder='password'
    value={password}
    onChange={(e)=>{
    setPassword(e.target.value)
    }}
    />


    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base' >Sign up</button>

   <p className='text-center text-sm' >Already have a account !!?  
    <Link to='/login' className='text-blue-600'> Login here</Link> </p>

    </form>
    </div>
    <div>
      
      <p className='text-[10px] leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis  re  eveniet necessitatibus  !</p>
    </div>
  </div>
  )
}

export default UserSignup
