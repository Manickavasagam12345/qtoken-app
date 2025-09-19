const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  getDoctorWiseCount,
  updateAppointmentReschedule,   // 👈 Make sure exact name
} = require("../controllers/appointmentController");

router.post("/create", createAppointment);
router.get("/list", getAppointments);
router.patch("/:id/status", updateAppointmentStatus);
router.get("/doctor-count", getDoctorWiseCount);

// 🔹 Reschedule route
router.patch("/:id/reschedule", updateAppointmentReschedule);

module.exports = router;
