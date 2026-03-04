const jwt = require("jsonwebtoken");

const generateTokens = (user) => {
  const secret_key = process.env.JWT_SECRET;
  if (!secret_key) throw new Error("JWT_SECRET not set!");

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, secret_key, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(payload, secret_key, {
    expiresIn: "10m",
  });

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
