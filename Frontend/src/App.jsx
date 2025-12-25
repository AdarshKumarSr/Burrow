import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserLogout from './pages/UserLogout';
import DoctorLogin from './pages/Doctorlogin';
import DoctorSignup from './pages/DoctorSignup';
// import ProtectedRoute from './pages/UserProtecedWrapper';
import DoctorHome from './pages/DoctorHome';
import Chatbot from './pages/Chatbot';
import DoctorProtectedWrapper from './pages/DoctorProtectWrapper';
import HealthChatbot from './components/HealthChatBot'; // ✅ Make sure path is correct
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import BuyMedicine from './pages/BuyMedicine';
// import BookTests from "./pages/BookTests";
import Dashboard from "./pages/Dashboard";
import BookAppointment from './pages/BookAppointment';
// import Profile from './pages/Profile';
import DoctorAppointments from './pages/DoctorAppointments';
// import ProtectedRoute from './components/ProtectRoute';
import ProtectedRoute from './pages/ProtectedRoute';
import Cart from './pages/Cart';

const App = () => {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <h1>🩺 Smart Symptom Predictor</h1>
      <HealthChatbot /> */}

      <Routes>
        <Route path='/' element={<Start />} />
        
        <Route path='/home' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/doctor-signup' element={<DoctorSignup />} />
        
        <Route path='/user/logout' element={
          <ProtectedRoute>
            <UserLogout />
          </ProtectedRoute>
        } />

        <Route path='/doctor-home' element={
          <DoctorProtectedWrapper>
            <DoctorHome />
          </DoctorProtectedWrapper>
        } />
        
        <Route path='/chatbot' element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        } />


        <Route path='/doctor/logout' element={
          <DoctorProtectedWrapper>
            <UserLogout />
          </DoctorProtectedWrapper>
        } />

        <Route path='/buy-medicine' element={
          <ProtectedRoute>
            <BuyMedicine />
          </ProtectedRoute>
        } />

        {/* <Route path="/book-tests" element={
            <ProtectedRoute>
              <BookTests />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path='/doctor/appointments'
          element={
            <DoctorProtectedWrapper>
              <DoctorAppointments />
            </DoctorProtectedWrapper>
          }
        />

        

        <Route path='/chat' element={<Chat />} />
        <Route path='/dashboard' element={
          
            <Dashboard />
          
          } />
        <Route path='/cart' element={<Cart />} />
        
        <Route path='/appointments' element={<BookAppointment />} />
        {/* <Route path='/profile' element={<Profile />} /> */}
      </Routes>
    </div>
  );
};

export default App;
