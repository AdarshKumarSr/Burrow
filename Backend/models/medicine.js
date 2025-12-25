const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: Number,
    image: String,
    category: String,
    isPrescriptionRequired: { type: Boolean, default: false },
    doctor: String, // only for prescribed meds
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
