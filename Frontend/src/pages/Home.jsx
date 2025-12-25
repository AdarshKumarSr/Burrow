import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/burrow-logo1 1.png";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* MAIN SCROLL CONTAINER */}
      <main className="pt-16 bg-gray-100">

        {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-[#f7fbfa] to-gray-100">

  {/* Decorative blurred background shapes */}
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1CB3A2]/20 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">

    {/* Logo */}
    <img
      src={logo}
      alt="Burrow Logo"
      className="w-40 h-40 object-contain mb-8 animate-fade-in-up"
    />

    {/* Heading */}
    <h1
      className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4 animate-fade-in-up delay-100"
      style={{ fontFamily: '"Baloo 2", cursive' }}
    >
      Burrow
    </h1>

    {/* Tagline */}
    <p className="text-[#1CB3A2] text-xl italic mb-6 animate-fade-in-up delay-200">
      A safe place to heal
    </p>

    {/* Supporting line (adds professionalism) */}
    <p className="text-gray-600 text-base mb-12 max-w-md animate-fade-in-up delay-300">
      Trusted digital healthcare tools to guide, support, and simplify your healing journey.
    </p>

    {/* Buttons */}
    <div className="flex gap-6 flex-col sm:flex-row animate-fade-in-up delay-500">
      <Link
        to="/signup"
        className="bg-[#1CB3A2] hover:bg-[#179a8b] text-white font-semibold py-3 px-10 rounded-xl shadow-lg text-lg transition transform hover:-translate-y-0.5"
      >
        Get Started
      </Link>

      <Link
        to="/login"
        className="border-2 border-[#1CB3A2] hover:bg-[#e7f8f6] text-[#1CB3A2] font-semibold py-3 px-10 rounded-xl shadow-md text-lg transition transform hover:-translate-y-0.5"
      >
        LOGIN
      </Link>
    </div>

    {/* Trust hint */}
    <div className="mt-14 text-sm text-gray-500 animate-fade-in-up delay-700">
      ✔ Secure · ✔ Private · ✔ Doctor-assisted
    </div>
  </div>
      </section>


        {/* FEATURES */}
       <section className="relative max-w-6xl mx-auto text-center py-28 px-6">

  {/* Section header */}
  <div className="mb-20 animate-fade-in-up">
    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
      Everything you need for better health
    </h2>
    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
      Simple, powerful tools designed to make healthcare accessible, reliable,
      and stress-free for everyone.
    </p>
  </div>

  {/* Feature cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    {[
      {
        title: "Talk to AI",
        desc: "Instant health guidance anytime, anywhere with smart AI assistance.",
        color: "bg-blue-500",
        link: "/chatbot",
        delay: "delay-100",
      },
      {
        title: "Find a Doctor",
        desc: "Browse verified healthcare professionals and choose the right care.",
        color: "bg-green-500",
        link: "/chatbot",
        delay: "delay-300",
      },
      {
        title: "Buy Medicine",
        desc: "Order medicines easily with real-time availability and fast delivery.",
        color: "bg-purple-500",
        link: "/buy-medicine",
        delay: "delay-500",
      },
    ].map(({ title, desc, color, link, delay }, i) => (
      <Link
        key={i}
        to={link}
        className={`group bg-white border border-gray-200 rounded-2xl p-8 shadow-sm
          transition-all duration-300 hover:shadow-xl hover:-translate-y-1
          animate-fade-in-up ${delay}`}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-12 h-12 ${color} rounded-full flex items-center justify-center
            shadow-md transition-transform duration-300 group-hover:scale-110`}
          />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {desc}
        </p>
      </Link>
    ))}
  </div>

  {/* Bottom divider (subtle polish) */}
  <div className="mt-24 h-px w-24 bg-[#1CB3A2] mx-auto opacity-40" />
        </section>


        {/* HOW IT WORKS */}
        <section className="relative max-w-6xl mx-auto text-center py-32 px-6">

  {/* Header */}
  <div className="mb-20 animate-fade-in-up">
    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
      How it Works
    </h2>
    <p className="text-lg text-gray-500">
      Three simple steps to better healthcare
    </p>
  </div>

  {/* Timeline connector (desktop only) */}
  <div className="hidden md:block absolute top-[55%] left-1/2 w-[70%] h-px bg-gray-200 -translate-x-1/2" />

  {/* Steps */}
  <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16">
    {[
      {
        num: "1",
        title: "Sign Up",
        desc: "Create your secure account in minutes and personalize your health profile.",
        delay: "delay-100",
      },
      {
        num: "2",
        title: "Get Guidance",
        desc: "Chat with AI or explore verified doctors for expert healthcare advice.",
        delay: "delay-300",
      },
      {
        num: "3",
        title: "Book & Heal",
        desc: "Schedule appointments easily and follow your personalized care plan.",
        delay: "delay-500",
      },
    ].map(({ num, title, desc, delay }, i) => (
      <div
        key={i}
        className={`flex flex-col items-center text-center animate-fade-in-up ${delay}`}
      >
        {/* Step bubble */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-[#1CB3A2] text-white text-2xl font-bold flex items-center justify-center shadow-lg">
            {num}
          </div>
        </div>

        {/* Text */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
          {desc}
        </p>
      </div>
    ))}
  </div>

  {/* Divider */}
  <div className="mt-28 h-px w-24 bg-[#1CB3A2] mx-auto opacity-40" />
        </section>


        {/* CTA */}
       <section className="relative py-20 px-6 text-center text-white overflow-hidden bg-gradient-to-r from-[#1CB3A2] to-[#169C82]">

  {/* Glow effects */}
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
  <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-white/10 rounded-full blur-3xl" />

  {/* Content */}
  <div className="relative z-10 max-w-3xl mx-auto animate-fade-in-up">
    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
      Ready to start your healing journey?
    </h2>

    <p className="text-lg text-white/90 mb-10">
      Join thousands of users who trust Burrow for guidance, care, and peace of mind.
    </p>

    <Link
      to="/signup"
      className="inline-flex items-center gap-2 bg-white text-[#1CB3A2] font-semibold py-4 px-10 rounded-full shadow-lg
      hover:bg-gray-100 transition transform hover:-translate-y-0.5"
    >
      Get Started Today
      <span className="text-lg">→</span>
    </Link>
  </div>
        </section>

      </main>
    </>
  );
};

export default Home;
