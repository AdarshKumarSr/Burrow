import React, { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserDataContext);

  const upcomingAppointments = [
    {
      doctor: 'Dr. Ayesha Khan',
      speciality: 'Dermatologist',
      date: 'June 30, 2024',
      time: '11:00 AM',
    },
    {
      doctor: 'Dr. Vikram Sharma',
      speciality: 'Orthopedic',
      date: 'July 2, 2024',
      time: '1:15 PM',
    },
    {
      doctor: 'Dr. Neha Bansal',
      speciality: 'Pediatrician',
      date: 'July 5, 2024',
      time: '4:00 PM',
    },
  ];

  const pastAppointments = [
    {
      doctor: 'Dr. Rajeev Mehta',
      speciality: 'Neurologist',
      date: 'June 10, 2024',
      time: '10:00 AM',
    },
    {
      doctor: 'Dr. Fatima Siddiqui',
      speciality: 'ENT Specialist',
      date: 'May 25, 2024',
      time: '3:45 PM',
    },
    {
      doctor: 'Dr. Arjun Rao',
      speciality: 'General Physician',
      date: 'May 5, 2024',
      time: '9:00 AM',
    },
  ];

  return (
    <div className="p-8 bg-[#f5fafd] min-h-screen pt-24">
      <h2 className="text-xl font-semibold mb-6">
        Good Afternoon, {user?.fullname?.firstname || 'User'}
      </h2>

      <div className="flex flex-wrap gap-4 mb-10">
        <div className="border rounded-lg px-6 py-3 flex items-center gap-3 bg-white shadow-sm">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <span className="text-sm font-medium">
            Total visits - <span className="text-green-500 font-semibold">12</span>
          </span>
        </div>
        <div className="border rounded-lg px-6 py-3 flex items-center gap-3 bg-white shadow-sm">
          <div className="w-3 h-3 rounded-full bg-pink-300"></div>
          <span className="text-sm font-medium">
            Next Visit - <span className="text-green-500 font-semibold">3 days later</span>
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
        <h3 className="text-lg font-semibold mb-6">Upcoming Appointments</h3>
        <div className="flex flex-col gap-4">
          {upcomingAppointments.map((appt, index) => (
            <div
              key={index}
              className="border border-cyan-200 rounded-lg p-4 flex justify-between items-center bg-[#fdfdfd]"
            >
              <div>
                <p className="font-semibold text-sm">{appt.doctor}</p>
                <p className="text-xs text-gray-600">{appt.speciality}</p>
                <p className="text-xs text-gray-500">
                  {appt.date} • {appt.time}
                </p>
              </div>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Join Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Past Appointments</h3>
        <div className="flex flex-col gap-4">
          {pastAppointments.map((appt, index) => (
            <div
              key={index}
              className="border border-cyan-200 rounded-lg p-4 flex justify-between items-center bg-[#fdfdfd]"
            >
              <div>
                <p className="font-semibold text-sm">{appt.doctor}</p>
                <p className="text-xs text-gray-600">{appt.speciality}</p>
                <p className="text-xs text-gray-500">
                  {appt.date} • {appt.time}
                </p>
              </div>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
