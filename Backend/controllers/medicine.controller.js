const Medicine = require("../models/medicine.js");

module.exports.getAllMedicines = async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
};

module.exports.getDoctorMedicines = async (req, res) => {
  const medicines = await Medicine.find({
    isPrescriptionRequired: true,
    doctor: { $exists: true },
  });
  res.json(medicines);
};
