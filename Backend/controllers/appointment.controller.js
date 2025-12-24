const Appointment = require("../models/appointment.model");

// helper
const generateMeetLink = () => {
  const rand = () => Math.random().toString(36).substring(2, 6);
  return `https://meet.google.com/${rand()}-${rand()}-${rand()}`;
};

// USER → book appointment
module.exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, mode, scheduledAt } = req.body;

    if (!doctorId || !mode || !scheduledAt) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const appointment = await Appointment.create({
      user: req.user._id,
      doctor: doctorId,
      mode,
      scheduledAt,
      meetingLink: mode === "online" ? generateMeetLink() : null,
      address: mode === "offline" ? "Clinic Address (dummy)" : null,
    });

    res.status(201).json({
      message: "Appointment requested successfully",
      appointment,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

// USER → view own appointments
module.exports.getUserAppointments = async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id })
    .populate("doctor", "fullname speciality");

  res.json(appointments);
};

// DOCTOR → view own appointments
module.exports.getDoctorAppointments = async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.captain._id })
    .populate("user", "fullname email");

  res.json(appointments);
};

// DOCTOR → update status
module.exports.updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  const allowed = ["confirmed", "completed", "cancelled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const appointment = await Appointment.findOne({
    _id: req.params.id,
    doctor: req.captain._id,
  });

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  appointment.status = status;
  await appointment.save();

  res.json({ message: "Status updated", appointment });
};
