import React, { useState, useContext } from 'react';
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
    <div className="min-h-screen bg-[#f4f8fc] pt-24 flex flex-col items-center px-4">
      <h2 className="text-3xl font-bold text-center mb-8 border-b-2 border-gray-400 pb-2 w-fit">
        Doctor Sign-up
      </h2>

      <form
        onSubmit={submitHandler}
        className="bg-white rounded-xl shadow-md px-10 py-8 w-full max-w-2xl"
      >
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            required
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        {/* Speciality & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            required
            type="text"
            placeholder="Speciality Field"
            value={specialityField}
            onChange={(e) => setSpecialityField(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <input
            required
            type="number"
            placeholder="Experience (Years)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        {/* License */}
        <div className="mb-6">
          <input
            required
            type="text"
            placeholder="License ID"
            value={licenseId}
            onChange={(e) => setLicenseId(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
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
          <Link to="/doctor-login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </form>

      <p className="text-xs text-gray-400 mt-6 text-center max-w-xl">
        By signing up, you confirm you are a certified professional. Ensure that the information provided is accurate to maintain the credibility of the platform.
      </p>
    </div>
  );
};

export default DoctorSignup;
