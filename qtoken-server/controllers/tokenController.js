
// Helper
const UserToken = require("../models/UserToken");
const Patient = require("../models/Patient");

// Helper
const getTodayDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getDayPrefix = () => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[new Date().getDay()];
};

const createToken = async (req, res) => {
  try {
    const { patientId, reason, doctor } = req.body;
    const today = getTodayDate();
    const prefix = getDayPrefix();

    const todayTokenCount = await UserToken.countDocuments({
      createdAt: { $gte: today },
      token_number: { $regex: `^${prefix}-` },
    });

    const token_number =
      prefix + "-" + String(todayTokenCount + 1).padStart(3, "0");

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const newToken = new UserToken({
      patient: patient._id,
      name: patient.name,
      reason,
      doctor,
      token_number,
    });

    await newToken.save();

    res.status(201).json({ message: "Token created", data: newToken });
  } catch (error) {
    console.error("Error creating token:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getTokens = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const today = getTodayDate();

    const query = {
      createdAt: { $gte: today },
      token_number: { $regex: search, $options: "i" },
    };

    const tokens = await UserToken.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await UserToken.countDocuments(query);
    res.json({ data: tokens, total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateTokenStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await UserToken.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Token not found" });

    res.json({ message: "Status updated", data: updated });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getReportTokens = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start and end date required" });
    }

    const query = {
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
      },
    };

    const tokens = await UserToken.find(query).sort({ createdAt: -1 });

    res.status(200).json({ data: tokens });
  } catch (error) {
    console.error("Error fetching report tokens:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getDistinctNames = async (req, res) => {
  try {
    const names = await UserToken.distinct("name");
    res.json({ data: names });
  } catch (err) {
    console.error("Failed to get names:", err);
    res.status(500).json({ message: "Failed to fetch names" });
  }
};

const getDistinctReasons = async (req, res) => {
  try {
    const reasons = await UserToken.distinct("reason");
    res.json({ data: reasons });
  } catch (err) {
    console.error("Failed to get reasons:", err);
    res.status(500).json({ message: "Failed to fetch reasons" });
  }
};

// ✅ Missed Tokens (Yesterday - for alert)
// const getMissedTokensYesterday = async (req, res) => {
//   try {
//     const today = getTodayDate();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);

//     const tokens = await UserToken.find({s
//       status: "missed",
//       createdAt: { $gte: yesterday, $lt: today },
//     });

//     res.status(200).json({ data: tokens });
//   } catch (err) {
//     console.error("Failed to fetch missed tokens:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = {
  createToken,
  getTokens,
  updateTokenStatus,
  getReportTokens,
  getDistinctNames,
  getDistinctReasons,
  // getMissedTokensYesterday,
};
