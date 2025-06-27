import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserLogout from './pages/UserLogout';
import DoctorLogin from './pages/Doctorlogin';
import DoctorSignup from './pages/DoctorSignup';
import UserProtectedWrapper from './pages/UserProtecedWrapper';
import DoctorHome from './pages/DoctorHome';
import Chatbot from './pages/Chatbot';
import DoctorProtectedWrapper from './pages/DoctorProtectWrapper';
import HealthChatbot from './components/HealthChatBot'; // ✅ Make sure path is correct
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import BookAppointment from './pages/BookAppointment';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      {/* <h1>🩺 Smart Symptom Predictor</h1>
      <HealthChatbot /> */}

      <Routes>
        <Route path='/' element={<Start />} />
        
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/doctor-signup' element={<DoctorSignup />} />
        
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />

        <Route path='/doctor-home' element={
          <DoctorProtectedWrapper>
            <DoctorHome />
          </DoctorProtectedWrapper>
        } />
        
        <Route path='/chatbot' element={
          <UserProtectedWrapper>
            <Chatbot />
          </UserProtectedWrapper>
        } />


        <Route path='/doctor/logout' element={
          <DoctorProtectedWrapper>
            <UserLogout />
          </DoctorProtectedWrapper>
        } />

        <Route path='/chat' element={<Chat />} />
        <Route path='/dashboard' element={<div className='p-8'>Dashboard coming soon...</div>} />
        <Route path='/bookappointment' element={<BookAppointment />} />
      </Routes>
    </div>
  );
};

export default App;
