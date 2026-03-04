const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../models/userModel");
const generateTokens = require("../utils/token.util");

const registerUser = async (req, res) => {
  const user = users.find((u) => u.email === req.body.email);
  if (user)
    return res
      .status(409)
      .json({ success: false, error: "Email already registered" });

  try {
    const { password, ...rest } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: users.length + 1,
      ...rest,
      role: "user",
      password: hashedPassword,
    };

    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({
      success: true,
      message: "registered successfully!",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

const loginUser = async (req, res) => {
  const user = users.find((u) => u.email === req.body.email);
  if (!user)
    return res
      .status(401)
      .json({ success: false, error: "Incorrect email or password!" });
  try {
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, error: "Incorrect email or password!" });

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });

    res.json({ success: true, token: accessToken });
  } catch {
    throw new Error("Somtething went wrong!");
  }
};
module.exports = { registerUser, loginUser };
