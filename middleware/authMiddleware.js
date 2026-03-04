const express = require("express");
const jwt = require("jsonwebtoken");
const refreshTokens = require("../models/authModel");

const verifyToken = (req, res, next) => {
  const secret_key = process.env.JWT_SECRET;
  if (!secret_key) throw new Error("JWT_SECRET not set!");

  const oldRefreshToken = req.cookie.refreshToken;
  if (!oldRefreshToken)
    return res.status(401).json({ success: false, error: "Token not found!" });

  const isFound = refreshTokens.includes(oldRefreshToken);
  if (!isFound)
    return res
      .status(401)
      .json({ success: false, error: "please login again!" });

  try {
    const decode = jwt.verify(oldRefreshToken, secret_key);
    req.decode = decode;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      refreshTokens = refreshTokens.filter((r) => r !== oldRefreshToken);
      res.clearCookie("refreshToken");
      res
        .status(401)
        .json({ success: false, error: "Token expired, please login again" });
    }
    res.status(401).json({ success: false, error: "Invlid token" });
  }
};
