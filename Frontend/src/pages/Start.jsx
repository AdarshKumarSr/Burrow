import React from 'react';
import { useNavigate } from 'react-router-dom';
import doctorImg from '../assets/doctor.jpeg';
import patientImg from '../assets/patient.jpeg';

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7fafd]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome to the Burrow Portal</h2>
        <p className="text-gray-500">
          To access the portal, you need to choose a type of access.
        </p>
      </div>

      <div className="flex gap-10">
        {/* Doctor Option */}
        <button
          onClick={() => navigate('/doctor-login')}
          className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition border border-gray-200 w-40"
        >
          <img
            src={doctorImg}
            alt="Doctor"
            className="w-20 h-20 rounded-full object-cover mb-3"
          />
          <span className="font-bold text-[#3eb489]">Doctor</span>
        </button>

        {/* Patient Option */}
        <button
          onClick={() => navigate('/login')}
          className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition border border-gray-200 w-40"
        >
          <img
            src={patientImg}
            alt="Patient"
            className="w-20 h-20 rounded-full object-cover mb-3"
          />
          <span className="font-bold text-[#3eb489]">Patient</span>
        </button>
      </div>
    </div>
  );
};

export default Start;
