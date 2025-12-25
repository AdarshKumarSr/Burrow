import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const BuyMedicine = () => {
  const { addToCart } = useCart();

  const [generalMedicines, setGeneralMedicines] = useState([]);
  const [doctorMedicines, setDoctorMedicines] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const [general, doctor] = await Promise.all([
          api.get("/medicines"),
          api.get("/medicines/doctor"),
        ]);

        setGeneralMedicines(general.data);
        setDoctorMedicines(doctor.data);

        // initialize quantities for doctor meds
        const qty = {};
        doctor.data.forEach((med) => {
          qty[med.name] = 1;
        });
        setQuantities(qty);
      } catch (err) {
        console.error("Failed to fetch medicines", err);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <>
      <Navbar />

      <div className="px-8 py-6 bg-[#f6fafc] min-h-screen">
        {/* ================= DOCTOR MEDICINES ================= */}
        <h2 className="text-2xl font-bold mb-4">
          Medicines Prescribed by Your Doctor
        </h2>

        <div className="flex flex-wrap gap-6 mb-14">
          {doctorMedicines.map((med) => (
            <div
              key={med._id || med.name}
              className="border border-teal-500 bg-white rounded-lg w-[300px] p-4 shadow-sm"
            >
              <h3 className="font-bold text-lg mb-1">{med.name}</h3>
              <p className="text-sm text-gray-600">
                Prescribed by {med.doctor}
              </p>

              <label className="text-sm font-medium block mb-1">
                Quantity
              </label>

              <input
                type="number"
                min={1}
                className="w-full border p-2 rounded mb-3"
                value={quantities[med.name] || 1}
                onChange={(e) =>
                  setQuantities({
                    ...quantities,
                    [med.name]: Number(e.target.value),
                  })
                }
              />

              <button
                onClick={() =>
                  addToCart({
                    name: med.name,
                    price: 0,
                    quantity: quantities[med.name] || 1,
                    doctor: med.doctor,
                  })
                }
                className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* ================= GENERAL MEDICINES ================= */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            Explore General Medicines
          </h2>

          <button className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition">
            ⬆️ Upload Prescription
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {generalMedicines.map((med) => (
            <div
              key={med._id || med.name}
              className="border bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={med.image}
                alt={med.name}
                className="w-full h-40 object-cover rounded mb-3"
              />

              <h3 className="font-semibold text-lg">{med.name}</h3>
              <p className="text-sm text-gray-600">
                {med.description}
              </p>

              <p className="text-green-600 font-semibold my-2">
                ₹{med.price}
              </p>

              <button
                onClick={() =>
                  addToCart({
                    name: med.name,
                    price: med.price,
                    quantity: 1,
                    image: med.image,
                  })
                }
                className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BuyMedicine;
