const express = require("express");
const {
  returnUserDashboard,
  returnAdminDashboard,
} = require("../controllers/dashboardController");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/user", verifyAccessToken, returnUserDashboard);
router.get("/admin", verifyAccessToken, verifyAdmin, returnAdminDashboard);
module.exports = router;
