import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { UserDataContext } from "../context/UserContext";
import AppointmentSection from "../components/AppointmentSection";

const Dashboard = () => {
  const { user } = useContext(UserDataContext);
  console.log("DASHBOARD USER:", user);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments/my");
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 p-8">Loading appointments...</div>
      </>
    );
  }

  const now = new Date();

  const upcoming = appointments.filter(
    (a) => new Date(a.scheduledAt) >= now
  );

  const past = appointments.filter(
    (a) => new Date(a.scheduledAt) < now
  );

  return (
    <>
      <Navbar />

      <div className="p-8 bg-[#f5fafd] min-h-screen pt-24">
       <h2 className="text-xl font-semibold mb-6">
  {user ? (
    <>Good Afternoon, {user.fullname.firstname}</>
  ) : (
    <span className="inline-block w-40 h-5 bg-gray-200 rounded animate-pulse" />
  )}
</h2>


        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-10">
          <div className="border rounded-lg px-6 py-3 bg-white shadow-sm">
            Total visits –{" "}
            <span className="text-green-600 font-semibold">
              {appointments.length}
            </span>
          </div>

          {upcoming[0] && (
            <div className="border rounded-lg px-6 py-3 bg-white shadow-sm">
              Next Visit –{" "}
              <span className="text-green-600 font-semibold">
                {new Date(upcoming[0].scheduledAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Upcoming */}
        <AppointmentSection
          title="Upcoming Appointments"
          data={upcoming}
          actionLabel="Join Now"
        />

        {/* Past */}
        <AppointmentSection
          title="Past Appointments"
          data={past}
          actionLabel="Download"
        />
      </div>
    </>
  );
};

export default Dashboard;
