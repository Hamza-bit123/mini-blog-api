const jwt = require("jsonwebtoken");
const refreshTokens = require("../models/authModel");

const verifyRefreshToken = (req, res, next) => {
  const secret_key = process.env.JWT_SECRET;
  if (!secret_key) throw new Error("JWT_SECRET not set!");

  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(401).json({ success: false, error: "Token not found!" });

  const isFound = refreshTokens.includes(token);
  if (!isFound)
    return res.status(403).json({ success: false, error: "Invlid token" });

  try {
    const decode = jwt.verify(token, secret_key);
    req.user = decode;
    req.refreshToken = token;
  } catch (err) {
    req.refreshToken = token;
    req.tokenError = err;
  } finally {
    next();
  }
};

module.exports = { verifyRefreshToken };
