const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/authMiddleware");
const { returnUser } = require("../controllers/rootControllers");

router.post("/me", verifyAccessToken, returnUser);

module.exports = router;
