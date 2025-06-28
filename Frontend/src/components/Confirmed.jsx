import React from 'react';
import car from '../assets/car.png'; // ✅ Ensure path is correct

const ConfirmedRide = (props) => {
  return (
    <div className="pt-24 px-6 pb-10">
      {/* Top Close Icon */}
      <div className="w-full flex justify-center mb-4">
        <button
          onClick={() => props.setVehiclePanel(false)}
          className="text-gray-500 hover:text-gray-800 text-3xl"
        >
          <i className="ri-arrow-down-wide-fill"></i>
        </button>
      </div>

      <h3 className="text-2xl font-bold mb-6 text-center">Confirm your Ride</h3>

      <div className="flex flex-col items-center">
        {/* Car Image */}
        <img className="h-24 mb-6" src={car} alt="Car Preview" />

        <div className="w-full space-y-4">
          {/* Pickup */}
          <div className="flex items-start gap-4 p-4 bg-white rounded-xl border shadow-sm">
            <i className="text-xl text-cyan-600 ri-map-pin-fill"></i>
            <div>
              <h4 className="text-base font-semibold">564/11-A</h4>
              <p className="text-sm text-gray-600">Pickup location address</p>
            </div>
          </div>

          {/* Drop */}
          <div className="flex items-start gap-4 p-4 bg-white rounded-xl border shadow-sm">
            <i className="text-xl text-cyan-600 ri-map-pin-user-fill"></i>
            <div>
              <h4 className="text-base font-semibold">737/A-d</h4>
              <p className="text-sm text-gray-600">Drop location address</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-start gap-4 p-4 bg-white rounded-xl border shadow-sm">
            <i className="text-xl text-cyan-600 ri-money-rupee-circle-fill"></i>
            <div>
              <h4 className="text-base font-semibold">₹50</h4>
              <p className="text-sm text-gray-600">Estimated Fare</p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => props.setvehicleFound(true)}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
