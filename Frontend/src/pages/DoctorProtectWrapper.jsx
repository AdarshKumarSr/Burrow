import React, { useContext, useEffect, useState } from 'react';
import { DoctorDataContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/doctor-login');
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/doctors/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setDoctor(response.data.doctor);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Profile fetch failed:', error);
        localStorage.removeItem('token');
        navigate('/doctor-login');
      });
  }, [token, navigate, setDoctor]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default DoctorProtectedWrapper;
