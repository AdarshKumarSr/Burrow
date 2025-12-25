const AppointmentSection = ({ title, data, actionLabel }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
      <h3 className="text-lg font-semibold mb-6">{title}</h3>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No appointments</p>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((appt) => (
            <div
              key={appt._id}
              className="border border-cyan-200 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-sm">
                  Dr. {appt.doctor?.firstname || "Doctor"}
                </p>
                <p className="text-xs text-gray-600">
                  {appt.doctor?.speciality}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(appt.scheduledAt).toLocaleDateString()} •{" "}
                  {new Date(appt.scheduledAt).toLocaleTimeString()}
                </p>
                <p className="text-xs mt-1">
                  Status:{" "}
                  <span className="capitalize font-medium">
                    {appt.status}
                  </span>
                </p>
              </div>

              {actionLabel === "Join Now" && appt.mode === "online" ? (
                <a
                  href={appt.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Join Now
                </a>
              ) : (
                <button className="bg-gray-300 text-black px-4 py-2 rounded-lg text-sm">
                  {actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentSection;
