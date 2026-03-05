const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const validator = require("../validator/validate");
const schemas = require("../schemas/schemas");

router.post(
  "/register",
  validator(schemas.registerSchema),
  authController.registerUser,
);

router.post("/login", validator(schemas.loginSchema), authController.loginUser);

router.post(
  "/refresh",
  authMiddleware.verifyRefreshToken,
  authController.refreshToken,
);

router.post("/logout", authController.logoutUser);

router.get("/", authMiddleware.verifyRefreshToken, authController.returnTokens);
module.exports = router;
