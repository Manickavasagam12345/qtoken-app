const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

exports.createAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, time, reason } = req.body;

    const appointment = new Appointment({ patient, doctor, date, time, reason });
    await appointment.save();

    res.status(201).json({ message: "Appointment created", data: appointment });
  } catch (err) {
    console.error("Create Appointment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctor", "name specialization");
    res.json({ data: appointments });
  } catch (err) {
    console.error("Get Appointments Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDoctorWiseCount = async (req, res) => {
  try {
    const Appointment = require("../models/Appointment");

    const result = await Appointment.aggregate([
      {
        $group: {
          _id: "$doctor",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "_id",
          foreignField: "_id",
          as: "doctor",
        },
      },
      {
        $unwind: "$doctor",
      },
      {
        $project: {
          doctor: "$doctor.name",
          count: 1,
        },
      },
    ]);

    res.json({ data: result });
  } catch (err) {
    console.error("Doctor-wise count error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "completed", "missed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("doctor", "name specialization");

    if (!updated) return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: "Status updated", data: updated });
  } catch (err) {
    console.error("Update Status Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


