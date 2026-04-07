const express = require("express");
const { returnUserDashboard } = require("../controllers/dashboardController");
const { verifyAccessToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", verifyAccessToken, returnUserDashboard);

module.exports = router;
