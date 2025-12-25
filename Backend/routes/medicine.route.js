const express = require("express");
const {
  getAllMedicines,
  getDoctorMedicines,
} = require("../controllers/medicine.controller");

const router = express.Router();

router.get("/", getAllMedicines);
router.get("/doctor", getDoctorMedicines);

module.exports = router;
