const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: { type: String, required: true }, // or ObjectId if you're using patient model
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: { type: String },
  status: {
    type: String,
    enum: ["pending", "completed", "missed"],
    default: "pending"
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
