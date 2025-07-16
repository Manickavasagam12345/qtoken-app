const express = require("express");
const router = express.Router();

const {
  createToken,
  getTokens,
  updateTokenStatus,
  getReportTokens,
  getDistinctNames,
  getDistinctReasons,
  // getMissedTokensYesterday,
} = require("../controllers/tokenController");

router.post("/create", createToken);
router.get("/list", getTokens);
router.patch("/:id/status", updateTokenStatus);
router.get("/reports", getReportTokens);
router.get("/distinct-names", getDistinctNames);
router.get("/distinct-reasons", getDistinctReasons);
// router.get("/missed-yesterday", getMissedTokensYesterday);

module.exports = router;
