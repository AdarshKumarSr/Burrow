import React from 'react';
import { Link } from 'react-router-dom';
import SymptomForm from '../components/HealthChatBot'; // adjust path if needed
import logo from '../assets/burrow-logo1 1.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-8">
        <img src={logo} alt="Burrow Logo" className="w-40 h-40 object-contain" />
      </div>

      {/* Title */}
      <h1
        className="text-5xl font-bold text-black mb-3"
        style={{ fontFamily: '"Baloo 2", cursive' }}
      >
        Burrow
      </h1>

      {/* Tagline */}
      <p
        className="text-[#1CB3A2] text-xl italic mb-12 text-center"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        A safe place to heal
      </p>

      {/* Buttons */}
      <div className="flex gap-6 flex-col sm:flex-row">
        <Link
          to="/signup"
          className="bg-[#1CB3A2] hover:bg-[#179a8b] text-white font-semibold py-3 px-10 rounded-xl shadow-md text-center text-lg transition duration-300 ease-in-out"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="border-2 border-[#1CB3A2] hover:bg-[#e7f8f6] text-[#1CB3A2] font-semibold py-3 px-10 rounded-xl shadow-md text-center text-lg transition duration-300 ease-in-out"
        >
          LOGIN
        </Link>
      </div>
       {/* Features Section */}
      <section className="w-full max-w-6xl text-center mb-28 translate-y-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Everything you need for better health
        </h2>
        <p className="text-lg text-gray-500 mb-16 px-4 max-w-2xl mx-auto">
          Simple, powerful tools designed to make healthcare accessible and stress-free for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
          {/* Card 1 */}
          <Link
            to="/chatbot"
            className="bg-white border rounded-xl shadow-sm p-8 transition hover:shadow-lg hover:-translate-y-1 transform duration-300"
          >
            <div className="flex justify-center mb-5">
              <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Talk to AI</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get instant health guidance from our AI assistant. Available 24/7 to answer your questions and provide preliminary assessments.
            </p>
          </Link>

          {/* Card 2 */}
          <Link
            to="/chatbot"
            className="bg-white border rounded-xl shadow-sm p-8 transition hover:shadow-lg hover:-translate-y-1 transform duration-300"
          >
            <div className="flex justify-center mb-5">
              <div className="w-10 h-10 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Find a Doctor</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Connect with qualified doctors in your area. Browse profiles, read reviews, and choose the right specialist for your needs.
            </p>
          </Link>

          {/* Card 3 */}
          <Link
            to="/chatbot"
            className="bg-white border rounded-xl shadow-sm p-8 transition hover:shadow-lg hover:-translate-y-1 transform duration-300"
          >
            <div className="flex justify-center mb-5">
              <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Book Appointments</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Schedule appointments effortlessly. Real-time availability, instant confirmations, and automatic reminders to keep you on track.
            </p>
          </Link>
        </div>
      </section>
      {/* How It Works Section */}
<section className="w-full max-w-6xl text-center mb-28 mt-20">
  <h2 className="text-4xl font-bold text-gray-900 mb-4">
    How it Works
  </h2>
  <p className="text-lg text-gray-500 mb-16">
    Three simple steps to better healthcare
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
    {/* Step 1 */}
    <div className="flex flex-col items-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-[#1CB3A2] text-white text-2xl font-bold flex items-center justify-center border mb-5">
        1
      </div>
      <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
        Create your secure account in minutes. Add your basic health information to get personalized recommendations.
      </p>
    </div>

    {/* Step 2 */}
    <div className="flex flex-col items-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-[#4F90F0] text-white text-2xl font-bold flex items-center justify-center border mb-5">
        2
      </div>
      <h3 className="text-xl font-semibold mb-2">Get Guidance</h3>
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
        Chat with our AI or browse verified doctors. Get instant health insights and find the right care for your needs.
      </p>
    </div>

    {/* Step 3 */}
    <div className="flex flex-col items-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-[#169C82] text-white text-2xl font-bold flex items-center justify-center border mb-5">
        3
      </div>
      <h3 className="text-xl font-semibold mb-2">Book & Heal</h3>
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
        Schedule your appointment with ease. Attend consultations and follow your personalized treatment plan.
      </p>
    </div>
  </div>
</section>
{/* Trusted By Section */}
<section className="bg-[#F6FAFD] w-full py-20 text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
    Trusted by healthcare professionals and patients
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
    <div className="bg-white rounded-lg shadow-sm py-6 px-4">
      <p className="text-2xl font-semibold text-[#1CB3A2]">500k+</p>
      <p className="text-gray-500 text-sm mt-1">Doctors</p>
    </div>
    <div className="bg-white rounded-lg shadow-sm py-6 px-4">
      <p className="text-2xl font-semibold text-[#1CB3A2]">10k+</p>
      <p className="text-gray-500 text-sm mt-1">Patients</p>
    </div>
    <div className="bg-white rounded-lg shadow-sm py-6 px-4">
      <p className="text-2xl font-semibold text-[#1CB3A2]">50+</p>
      <p className="text-gray-500 text-sm mt-1">Cities</p>
    </div>
    <div className="bg-white rounded-lg shadow-sm py-6 px-4">
      <p className="text-2xl font-semibold text-[#1CB3A2]">4.8</p>
      <p className="text-gray-500 text-sm mt-1">Rating</p>
    </div>
  </div>
</section>

{/* CTA Section */}
<section className="bg-[#1CB3A2] py-16 text-center w-full text-white">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
    Ready to start your healing journey?
  </h2>
  <p className="text-lg mb-8">
    Join thousands of users who trust Burrow for their healthcare needs.
  </p>
  <a 
    href="/signup" 
    className="bg-white text-[#1CB3A2] hover:bg-gray-100 font-semibold py-3 px-6 rounded-full transition-all"
  >
    Get Started Today →
  </a>
</section>

    </div>
  );
};

export default Home;
