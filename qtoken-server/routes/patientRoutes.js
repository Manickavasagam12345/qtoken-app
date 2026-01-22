const express = require("express");
const router = express.Router();
const {
  getPatientByPhone,
  createPatient,
  getPatients
} = require("../controllers/patientController");

router.get("/phone/:phone", getPatientByPhone);
router.post("/create", createPatient);
router.get("/list", getPatients);


module.exports = router;
