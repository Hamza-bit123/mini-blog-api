const jwt = require("jsonwebtoken");

const generateTokens = (user) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) throw new Error("JWT_SECRET not set!");
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "30m" });
  const refreshToken = jwt.sign(payload, secretKey, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
