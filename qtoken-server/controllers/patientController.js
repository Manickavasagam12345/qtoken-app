const Patient = require("../models/Patient");

// 🔍 Get patient by phone
const getPatientByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const patient = await Patient.findOne({ phone });

    if (!patient) {
      return res.json({ found: false });
    }

    res.json({ found: true, data: patient });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ➕ Create new patient
const createPatient = async (req, res) => {
  try {
    const { name, phone, age, gender } = req.body;

    const lastPatient = await Patient.findOne().sort({ createdAt: -1 });
    let nextNumber = 1;

    if (lastPatient && lastPatient.patient_id) {
      const lastNum = parseInt(lastPatient.patient_id.split("-")[1]);
      nextNumber = lastNum + 1;
    }

    const patient_id = "PT-" + String(nextNumber).padStart(3, "0");

    const newPatient = new Patient({
      patient_id,
      name,
      phone,
      age,
      gender,
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient created", data: newPatient });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPatients = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    search = search ? search.trim() : "";

    // Case-insensitive partial match
    const searchRegex = new RegExp(search, "i");

    // Only apply $or if search is not empty
    const query = search
      ? {
          $or: [
            { name: { $regex: searchRegex } },
            { phone: { $regex: searchRegex } },
            { patient_id: { $regex: searchRegex } },
          ],
        }
      : {};

    const patients = await Patient.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Patient.countDocuments(query);

    res.json({ data: patients, total });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { getPatientByPhone, createPatient, getPatients };
