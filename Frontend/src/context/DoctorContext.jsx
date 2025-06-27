import React, { createContext, useState } from 'react';

export const DoctorDataContext = createContext();

const DoctorContext = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateDoctor = (doctorData) => {
    setDoctor(doctorData);
  };

  const value = {
    doctor,
    setDoctor,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateDoctor,
  };

  return (
    <DoctorDataContext.Provider value={value}>
      {children}
    </DoctorDataContext.Provider>
  );
};

export default DoctorContext;
