const express = require("express");
const router = express.Router();
const { registrationSchema, loginSchema } = require("../schemas/schemas");
const validator = require("../validator/validate");
const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} = require("../controllers/authController");

router.post("/register", validator(registrationSchema), registerUser);

router.post("/login", validator(loginSchema), loginUser);

router.post("/refresh", refreshToken);

router.post("/logout", logoutUser);
module.exports = router;
