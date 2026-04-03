const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) throw new Error("JWT_SECRET not set!");

  try {
    const decode = jwt.verify(token, secretKey);
    return { error: null, decode };
  } catch (err) {
    return { error: err, decode: null };
  }
};

module.exports = verifyToken;
