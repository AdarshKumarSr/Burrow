import React, { useState } from "react";
import Navbar from '../components/Navbar';

const doctorMedicines = [
  {
    name: "Amoxicillin 500mg",
    doctor: "Dr. Smith",
    date: "Dec 15, 2024",
    defaultQuantity: 10,
  },
  {
    name: "Paracetamol 650mg",
    doctor: "Dr. Johnson",
    date: "Nov 28, 2024",
    defaultQuantity: 20,
  },
];

const generalMedicines = [
  {
    name: "Paracetamol 500mg",
    description: "For fever and pain relief",
    price: 45,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/21c2280d80-14aed35854e9ff394372.png",
  },
  {
    name: "Vitamin D3 1000 IU",
    description: "Bone health supplement",
    price: 299,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/37a8bfb517-40d96ba786991f00ad24.png",
  },
  {
    name: "Honey Cough Syrup",
    description: "Natural cough relief",
    price: 125,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/f033032e76-14dd1edee1e85da1a4a1.png",
  },
  {
    name: "Antiseptic Cream",
    description: "Wound care and healing",
    price: 90,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/1d9ca3e464-62123cc5a47e874499e4.png",
  },
  {
    name: "Multivitamin Tablets",
    description: "Daily nutrition support",
    price: 199,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/2aec3f2b92-5001cc41703334a7e509.png",
  },
  {
    name: "Antacid Tablets",
    description: "Acidity and gas relief",
    price: 85,
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/9b005c214c-b7c71c41ae714b6dabcd.png",
  },
];

const BuyMedicine = () => {
  const [quantities, setQuantities] = useState(
    doctorMedicines.reduce((acc, med) => {
      acc[med.name] = med.defaultQuantity;
      return acc;
    }, {})
  );

  return (

    <>
      <Navbar />
 
    <div className="px-8 py-6">
      {/* Doctor Prescribed Medicines */}
      <div className="flex gap-6 mb-12">
        <div className="w-1/4 space-y-6">
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full p-2 border rounded"
          />
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            {["Fever", "Cough", "Immunity", "Vitamins"].map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <input type="checkbox" id={cat} />
                <label htmlFor={cat}>{cat}</label>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <input type="range" min={0} max={500} className="w-full" />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>₹0</span>
              <span>₹500+</span>
            </div>
          </div>
        </div>

        <div className="w-3/4">
          <h2 className="text-2xl font-bold mb-4">Medicines From Your Doctor</h2>
          <div className="flex flex-wrap gap-6">
            {doctorMedicines.map((med) => (
              <div
                key={med.name}
                className="border border-teal-500 rounded-lg w-[300px] p-4 shadow-sm"
              >
                <h3 className="font-bold text-lg mb-1">{med.name}</h3>
                <p className="text-sm text-gray-600">
                  Prescribed by {med.doctor}
                </p>
                <p className="text-sm text-gray-600 mb-3">{med.date}</p>
                <label className="text-sm font-medium block mb-1">Quantity</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded mb-3"
                  value={quantities[med.name]}
                  onChange={(e) =>
                    setQuantities({
                      ...quantities,
                      [med.name]: e.target.value,
                    })
                  }
                />
                <button className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
                  Add to Cart
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Delivery in 2–3 days
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* General Medicines */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Explore General Medicines</h2>
          <button className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600">
            ⬆️ Upload Prescription
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {generalMedicines.map((med) => (
            <div
              key={med.name}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={med.image}
                alt={med.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-lg">{med.name}</h3>
              <p className="text-sm text-gray-600">{med.description}</p>
              <p className="text-green-600 font-semibold text-md my-2">
                ₹{med.price}
              </p>
              <button className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
                Add to Cart
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Delivery in 1–2 days
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
       </>
  );
};

export default BuyMedicine;
