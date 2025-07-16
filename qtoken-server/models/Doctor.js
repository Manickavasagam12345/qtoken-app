const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: String,
    department: String,
    phone: String,
    email: String,
    specialization: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
