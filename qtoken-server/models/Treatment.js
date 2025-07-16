const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    diagnosis: String,
    treatment: String,
    medicines: [String],
    nextAppointment: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Treatment", treatmentSchema);
