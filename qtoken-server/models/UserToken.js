const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema({
  name: String,
  reason: String,
  token_number: String,
  status: {
    type: String,
    enum: ["pending", "missed", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserToken", userTokenSchema);
