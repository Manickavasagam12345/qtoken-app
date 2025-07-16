const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  getDoctorWiseCount
} = require("../controllers/appointmentController");

router.post("/create", createAppointment);
router.get("/list", getAppointments);
router.patch("/:id/status", updateAppointmentStatus);
router.get("/doctor-count", getDoctorWiseCount);

module.exports = router;