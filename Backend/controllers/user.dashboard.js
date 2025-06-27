const appointments = [
  { id: 1, date: '2025-07-01T10:00:00Z', description: 'Dentist appointment' },
  { id: 2, date: '2025-06-01T14:00:00Z', description: 'Meeting with client' },
  { id: 3, date: '2025-06-30T09:00:00Z', description: 'Haircut appointment' },
];

const getUpcomingAppointments = (req, res) => {
  const now = new Date();
  const upcoming = appointments.filter(appointment => new Date(appointment.date) > now);
  res.json({ upcoming });
};

const getPastAppointments = (req, res) => {
  const now = new Date();
  const past = appointments.filter(appointment => new Date(appointment.date) <= now);
  res.json({ past });
};

module.exports = {
  getUpcomingAppointments,
  getPastAppointments,
};
