const UserToken = require("../models/UserToken");

// Helper
const getTodayDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// ✅ Create Token
const createToken = async (req, res) => {
  try {
    const { name, reason, doctor } = req.body;
    const today = getTodayDate();

    const todayTokenCount = await UserToken.countDocuments({
      createdAt: { $gte: today },
    });

    const token_number = "T" + String(todayTokenCount + 1).padStart(3, "0");

    const newToken = new UserToken({ name, reason, doctor, token_number });
    await newToken.save();

    res.status(201).json({ message: "Token created", data: newToken });
  } catch (error) {
    console.error("Error creating token:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ List Tokens (Today)
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

// ✅ Update Token Status
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

// ✅ Report Filter by Date
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

    const tokens = await UserToken.find(query)
      .populate("doctor", "name") // only if doctor is ObjectId
      .sort({ createdAt: -1 });

    res.status(200).json({ data: tokens });
  } catch (error) {
    console.error("Error fetching report tokens:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Distinct patient names (dropdown)
const getDistinctNames = async (req, res) => {
  try {
    const names = await UserToken.distinct("name");
    res.json({ data: names });
  } catch (err) {
    console.error("Failed to get names:", err);
    res.status(500).json({ message: "Failed to fetch names" });
  }
};

// ✅ Distinct reasons (dropdown)
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

//     const tokens = await UserToken.find({
//       status: "missed",
//       createdAt: { $gte: yesterday, $lt: today },
//     });

//     res.status(200).json({ data: tokens });
//   } catch (err) {
//     console.error("Failed to fetch missed tokens:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// ✅ Export
module.exports = {
  createToken,
  getTokens,
  updateTokenStatus,
  getReportTokens,
  getDistinctNames,
  getDistinctReasons,
  // getMissedTokensYesterday,
};
