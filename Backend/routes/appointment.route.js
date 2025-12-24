const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointment.controller");

const {
  authUser,
  authCaptain,
} = require("../middlewares/auth.middleware");

// =======================
// USER ROUTES
// =======================
router.post("/", authUser, createAppointment);
router.get("/my", authUser, getUserAppointments);

// =======================
// DOCTOR ROUTES
// =======================
router.get("/doctor", authCaptain, getDoctorAppointments);
router.patch("/:id/status", authCaptain, updateAppointmentStatus);

module.exports = router;
