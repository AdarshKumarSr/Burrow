import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const BuyMedicine = () => {
  const { addToCart } = useCart();

  const [generalMedicines, setGeneralMedicines] = useState([]);
  const [doctorMedicines, setDoctorMedicines] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [adding, setAdding] = useState(null);

  // 🔎 UI states
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const [general, doctor] = await Promise.all([
          api.get("/medicines"),
          api.get("/medicines/doctor"),
        ]);

        setGeneralMedicines(general.data);
        setDoctorMedicines(doctor.data);

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

  // ================= FILTER + SORT =================
  const filteredGeneralMedicines = useMemo(() => {
    let meds = [...generalMedicines];

    if (search) {
      meds = meds.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low") {
      meds.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      meds.sort((a, b) => b.price - a.price);
    }

    return meds;
  }, [generalMedicines, search, sort]);

  return (
    <>
      <Navbar />

        <div className="px-8 py-8 pt-24 bg-[#f6fafc] min-h-screen">
        {/* ================= DOCTOR MEDICINES ================= */}
        {doctorMedicines.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Prescribed by Your Doctor
            </h2>

            <div className="flex flex-wrap gap-6 mb-16">
              {doctorMedicines.map((med) => (
                <div
                  key={med._id || med.name}
                  className="w-[300px] bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg">{med.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Prescribed by {med.doctor}
                  </p>

                  <label className="text-xs font-medium text-gray-600">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min={1}
                    className="w-full border p-2 rounded mt-1 mb-3"
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
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= GENERAL MEDICINES ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Explore Medicines</h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-44"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="none">Sort by</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>

            <button className="bg-teal-500 text-white px-4 rounded-lg hover:bg-teal-600 transition">
              ⬆️ Upload Prescription
            </button>
          </div>
        </div>

        {/* ================= MEDICINE GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGeneralMedicines.map((med) => (
            <div
              key={med._id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={med.image}
                alt={med.name}
                className="w-full h-44 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{med.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {med.description}
                </p>

                <p className="text-lg font-bold text-green-600 mb-3">
                  ₹{med.price}
                </p>

                <button
                  disabled={adding === med._id}
                  onClick={async () => {
                    setAdding(med._id);
                    await addToCart({
                      name: med.name,
                      price: med.price,
                      quantity: 1,
                      image: med.image,
                    });
                    setAdding(null);
                  }}
                  className={`w-full py-2 rounded-lg font-medium transition ${
                    adding === med._id
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-teal-500 hover:bg-teal-600 text-white"
                  }`}
                >
                  {adding === med._id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredGeneralMedicines.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No medicines found
          </p>
        )}
      </div>
    </>
  );
};

export default BuyMedicine;
