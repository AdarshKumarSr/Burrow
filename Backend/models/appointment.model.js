const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    mode: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["requested", "confirmed", "completed", "cancelled"],
      default: "requested",
    },
    meetingLink: String,
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointment", appointmentSchema);
