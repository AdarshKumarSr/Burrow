import React, { useState, useContext } from 'react';
import logo from '../assets/burrowlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { DoctorDataContext } from '../context/DoctorContext';
import axios from 'axios';

const DoctorSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [specialityField, setSpecialityField] = useState('');
  const [experience, setExperience] = useState('');
  const [licenseId, setLicenseId] = useState('');

  const { setDoctor } = useContext(DoctorDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const doctorData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      speciality: {
        field: specialityField,
        experience: Number(experience),
        licenseId,
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/doctors/register`, doctorData);

      if (response.status === 201) {
        const data = response.data;
        setDoctor(data.doctor);
        localStorage.setItem('token', data.token);
        navigate('/doctor-home');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup failed. Please check your input or try again later.');
    }

    // Reset form
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setSpecialityField('');
    setExperience('');
    setLicenseId('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-15 mb-14' src={logo} alt="Burrow Logo" />
        <form onSubmit={submitHandler}>
          <h3 className='font-bold text-base mb-2'>What's your Name</h3>
          <div className='flex gap-4 mb-6'>
            <input
              required
              className='bg-[#eee] rounded px-4 py-2 w-1/2 text-base placeholder:text-sm'
              type='text'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className='bg-[#eee] rounded px-4 py-2 w-1/2 text-base placeholder:text-sm'
              type='text'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className='font-bold text-base mb-2'>Speciality Information</h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              className="bg-[#eee] rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
              type="text"
              placeholder="Speciality Field"
              value={specialityField}
              onChange={(e) => setSpecialityField(e.target.value)}
            />
            <input
              required
              className="bg-[#eee] rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
              type="number"
              placeholder="Experience (Years)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <input
            required
            className="bg-[#eee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm"
            type="text"
            placeholder="License ID"
            value={licenseId}
            onChange={(e) => setLicenseId(e.target.value)}
          />

          <h3 className='font-bold text-base mb-2'>What's your Email</h3>
          <input
            required
            className='bg-[#eee] mb-5 rounded px-4 py-2 w-full text-base placeholder:text-sm'
            type='email'
            placeholder='email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className='font-bold text-base mb-2'>Enter Password</h3>
          <input
            required
            className='bg-[#eee] mb-5 rounded px-4 py-2 w-full text-base placeholder:text-sm'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg'>
            Sign Up
          </button>

          <p className='text-center text-sm'>
            Already have an account?
            <Link to='/doctor-login' className='text-blue-600'> Login here</Link>
          </p>
        </form>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis re eveniet necessitatibus!
        </p>
      </div>
    </div>
  );
};

export default DoctorSignup;
