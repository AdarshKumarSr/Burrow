import React, { useState } from 'react'
import logo from '../assets/burrowlogo.png';
import { Link, useNavigate } from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';
import { CaptainDataContext } from '../context/DoctorContext';
import axios from 'axios';
 
const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  const {captain, setCaptain} = React.useContext(CaptainDataContext);
  const navigate = useNavigate()

   

  const submitHandler = async (e) => {
    e.preventDefault()

    const captain = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/doctor/login`, captain)
    // console.log(captain);

    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/doctor-home')
    }
    
    // Handle form submission logic here
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <img className='w-15 mb-14'  src={logo} alt="Uber Logo" />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} >
      <h3 className='font-bold text-lg mb-2'> What's your Email  </h3>
      <input 
      required 
      value={email}
      onChange={(e) => {
        setEmail(e.target.value)
      }}
      className='bg-[#eee] mb-7 rounded px-4 py-2   w-full text-lg placeholder:text-base'
      type='email' placeholder='email@example.com' />

      <h3 className='font-bold text-lg mb-2'> Enter Password</h3>
      <input 
      required
      value={password}
      onChange={(e) => {
        setPassword(e.target.value)
      }} 
       className=' bg-[#eee] mb-7 rounded px-4 py-2   w-full text-lg placeholder:text-base'
      type='password' placeholder='password' />


      <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base' >Login</button>

     <p className='text-center' >Join a fleet  !! 
      <Link to='/doctor-signup' className='text-blue-600'> Register as a Captain</Link> </p>

      </form>
      </div>
      <div>
        <Link 
        to='/login'
           className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        > SignIn As User</Link>
      </div>
    </div>
  )
}

export default Captainlogin
