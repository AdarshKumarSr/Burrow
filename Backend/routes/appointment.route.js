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

// User routes
router.post("/", authUser, createAppointment);
router.get("/user", authUser, getUserAppointments);

// Doctor routes
router.get("/doctor", authCaptain, getDoctorAppointments);
router.patch("/:id/status", authCaptain, updateAppointmentStatus);

module.exports = router;
