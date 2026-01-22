const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patient_id: { type: String, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    age: Number,
    gender: String,
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
