import React, { useState } from 'react'
import logo from '../assets/burrowlogo.png';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setuserData] = useState('')

  const {user , setUser} = React.useContext(UserDataContext)
  const Navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
     const userData = {
      email: email,
      password: password
     }


    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    // Handle form submission logic here


    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      Navigate('/home')
    }

    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      
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

     <p className='text-center' >New here!!?  
      <Link to='/Signup' className='text-blue-600'> Create New Account</Link> </p>

      </form>
      </div>
      <div>
        <Link 
        to='/doctor-login'
           className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        > SignIn As Doctor</Link>
      </div>
    </div>
  )
}

export default UserLogin
