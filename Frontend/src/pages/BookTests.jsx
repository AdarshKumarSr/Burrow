import React from "react";
import Navbar from '../components/Navbar';
const prescribedTests = [
  {
    name: "CBC - Complete Blood Count",
    doctor: "Dr. Sarah Johnson",
    date: "Dec 20, 2024",
    price: 650,
    icon: "🧪",
  },
  {
    name: "Thyroid Function Test",
    doctor: "Dr. Michael Chen",
    date: "Dec 18, 2024",
    price: 600,
    icon: "💚",
  },
];

const generalTests = [
  {
    name: "Blood Sugar Test",
    description: "Includes fasting & random glucose levels",
    price: 350,
    icon: "🩸",
  },
  {
    name: "Lipid Profile",
    description: "Complete cholesterol analysis",
    price: 800,
    icon: "🧬",
  },
  {
    name: "Liver Function Test",
    description: "Includes 8 liver parameters",
    price: 750,
    icon: "🧪",
  },
  {
    name: "Kidney Function Test",
    description: "Complete renal panel",
    price: 900,
    icon: "🔬",
  },
];

const BookTests = () => {
  const cartTests = 2;
  const cartTotal = 1250;

  return (

    <>
      <Navbar />
 
    <div className="px-8 py-6 pb-32 relative">
      {/* Top Heading */}
      <h1 className="text-3xl font-bold mb-2">Book Lab Tests</h1>
      <p className="text-gray-600 mb-8">
        Choose from tests prescribed by your doctor or explore general health packages.
      </p>

      {/* Prescribed Tests */}
      <div className="mb-4 flex items-center space-x-2">
        <span className="text-2xl">🩺</span>
        <h2 className="text-xl font-semibold">Prescribed Tests</h2>
      </div>

      <div className="flex flex-wrap gap-6 mb-10">
        {prescribedTests.map((test) => (
          <div
            key={test.name}
            className="bg-white border rounded-lg shadow-sm p-5 w-[320px] relative"
          >
            <div className="absolute top-4 right-4 text-sm text-gray-400">Prescribed</div>
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-2xl rounded mb-3">
              {test.icon}
            </div>
            <h3 className="text-lg font-semibold">{test.name}</h3>
            <div className="text-sm text-gray-600 mt-1 mb-1">
              <div className="flex items-center gap-2">
                <span>👨‍⚕️</span>
                <span>{test.doctor}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span>📅</span>
                <span>Prescribed on {test.date}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold text-lg">₹{test.price}</span>
              <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* General Tests Section */}
      <div className="mb-4 flex items-center space-x-2">
        <span className="text-2xl">🧪</span>
        <h2 className="text-xl font-semibold">General Lab Tests</h2>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a test..."
          className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-lg mb-4"
        />
        <div className="flex flex-wrap gap-3">
          {["All Tests", "Blood", "Thyroid", "Urine", "Diabetes", "Liver"].map((cat, i) => (
            <button
              key={i}
              className={`px-4 py-1.5 rounded-md ${
                cat === "All Tests"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* General Test Cards */}
      <div className="flex flex-wrap gap-6 mb-10">
        {generalTests.map((test) => (
          <div
            key={test.name}
            className="bg-white border rounded-lg shadow-sm p-5 w-[280px]"
          >
            <div className="w-10 h-10 flex items-center justify-center text-2xl rounded bg-red-50 mb-3">
              {test.icon}
            </div>
            <h3 className="text-lg font-semibold mb-1">{test.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{test.description}</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">₹{test.price}</span>
              <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Prescription Section */}
      <div className="bg-white border rounded-xl p-10 text-center max-w-5xl mx-auto mb-10">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-2xl text-teal-700">
            ⬆️
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Have a prescription?</h3>
        <p className="text-gray-600 mb-4">
          Upload your prescription and we'll help you book the right tests
        </p>
        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">
          Upload Prescription
        </button>
      </div>

      {/* Floating Cart Bar */}
      <div className="fixed bottom-6 right-6 bg-white border rounded-xl shadow-lg px-6 py-4 flex items-center gap-6 z-50">
        <div>
          <div className="text-gray-600 text-sm">
            🛒 Cart ({cartTests} tests)
          </div>
          <div className="font-semibold text-lg">₹{cartTotal}</div>
        </div>
        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">
          Proceed to Checkout
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-600 text-sm mt-16">
        🛡️ Tests conducted by certified labs • Secure & confidential
      </div>
    </div>

       </>
  );
};

export default BookTests;
