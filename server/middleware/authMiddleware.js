const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/jwt.js");

const verifyAccessToken = (req, res, next) => {
  const header = req.headers;
  if (!header)
    return res.status(401).json({
      success: false,
      error: "Access token not found",
    });
  const token = header.authorization.split(" ")[1];

  const { error, decode } = verifyToken(token);
  if (error) {
    return res.status(403).json({ success: false, error: "Invalid token" });
  }
  req.user = decode;
  next();
};

module.exports = { verifyAccessToken };
