const Doctor = require("../models/Doctor");

exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: "Doctor created", data: doctor });
  } catch (err) {
    console.error("Create Doctor Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.status(200).json({ data: doctors });
  } catch (err) {
    console.error("Get Doctors Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
