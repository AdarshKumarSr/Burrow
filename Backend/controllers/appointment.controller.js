const Appointment = require("../models/appointment.model");

// helper → generate fake Google Meet link
const generateMeetLink = () => {
  const rand = () => Math.random().toString(36).substring(2, 6);
  return `https://meet.google.com/${rand()}-${rand()}-${rand()}`;
};

// =======================
// USER → CREATE APPOINTMENT
// =======================
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

    return res.status(201).json({
      message: "Appointment requested successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create appointment",
    });
  }
};

// =======================
// USER → GET OWN APPOINTMENTS
// =======================
module.exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    })
      .populate("doctor", "fullname speciality")
      .sort({ scheduledAt: 1 });

    return res.json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// =======================
// DOCTOR → GET OWN APPOINTMENTS
// =======================
module.exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.captain._id,
    })
      .populate("user", "fullname email")
      .sort({ scheduledAt: 1 });

    return res.json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// =======================
// DOCTOR → UPDATE STATUS
// =======================
module.exports.updateAppointmentStatus = async (req, res) => {
  try {
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

    return res.json({
      message: "Status updated successfully",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update status" });
  }
};
