import React, { useState } from 'react'
import logo from '../assets/burrowlogo.png';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/DoctorContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainSignup = () => {


    const navigate = useNavigate()  

   const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setuserData] = useState({})

    const [ vehicalColor, setVehicalColor ]=useState('')
    const [ vehicalPlate, setVehicalPlate ]=useState('')
    const [ vehicalCapacity, setVehicalCapacity ]=useState('')
    const [ vehicalType, setVehicalType ]=useState('')

    const {captain,  setCaptain} = React.useContext(CaptainDataContext);

   
    const submitHandler = async (e) => {
      e.preventDefault()
       const captainData = {

         fullname:{
            firstname:firstName,
            lastname:lastName,
         },
          email: email,
          password: password,
          vehicle:{
            color:vehicalColor,
            plate:vehicalPlate,
            capacity:vehicalCapacity,
            vehicleType:vehicalType
          }
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/doctor/register`, captainData)

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/doctor-home')
      }

      console.log(captainData);
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
      setVehicalColor('')
      setVehicalPlate('')
      setVehicalCapacity('')
      setVehicalType('')
      // Handle form submission logic here
    }
  return (
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

         <h3 className='font-bold text-base mb-2'> What's ur vehical Type  </h3>
      {/* <div>
       <div className='flex gap-4 mb-6'>
         <input 
          required 
          className='bg-[#eee]   rounded px-4 py-2   w-1/2 text-base placeholder:text-sm'
          type='text' placeholder='Vehical Color'
          value={vehicalColor}
          onChange={(e)=>{
            setFirstName(e.target.value)
          }}
          />

          <input  
          className='bg-[#eee]  rounded px-4 py-2   w-1/2 text-base placeholder:text-sm'
          type='text' placeholder='Vehical Plate'
          value={vehicalPlate}
          onChange={(e)=>{
          setLastName(e.target.value)
          }} />          
         </div>
         
         <div className='flex gap-4 mb-6'>
         <input 
          required 
          className='bg-[#eee]   rounded px-4 py-2   w-1/2 text-base placeholder:text-sm'
          type='text' placeholder='Vehical Capacity'
          value={vehicalCapacity}
          onChange={(e)=>{
            setFirstName(e.target.value)
          }}
          />

          <input  
          className='bg-[#eee]  rounded px-4 py-2   w-1/2 text-base placeholder:text-sm'
          type='text' placeholder='Vehical Type'
          value={vehicalType}
          onChange={(e)=>{
          setLastName(e.target.value)
          }} />          
         </div>
         
       </div> */}
<div>
  <div className="flex gap-4 mb-6">
    <input
      required
      className="bg-[#eee] rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
      type="text"
      placeholder="Vehicle Color"
      value={vehicalColor}
      onChange={(e) => setVehicalColor(e.target.value)}
    />

    <input
      required
      className="bg-[#eee] rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
      type="text"
      placeholder="Vehicle Plate"
      value={vehicalPlate}
      onChange={(e) => setVehicalPlate(e.target.value)}
    />
  </div>

  <div className="flex gap-4 mb-6">
    <input
      required
      className="bg-[#eee] rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
      type="number"
      placeholder="Vehicle Capacity"
      value={vehicalCapacity}
      onChange={(e) => setVehicalCapacity(e.target.value)}
    />

    <select
      required
      className="bg-[#eee] rounded px-4 py-2 w-1/2 text-base"
      value={vehicalType}
      onChange={(e) => setVehicalType(e.target.value)}
    >
      <option value="">Select Vehicle Type</option>
      <option value="car">car</option>
      <option value="auto">auto</option>
      <option value="bike">bike</option>
    </select>
  </div>
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
    <Link to='/doctor-login' className='text-blue-600'> Login here</Link> </p>

    </form>
    </div>
    <div>
      
      <p className='text-[10px] leading-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis  re  eveniet necessitatibus  !</p>
    </div>
  </div>
  )
}

export default CaptainSignup
