const bcrypt = require("bcryptjs");
const users = require("../models/userModel");
const generateTokens = require("../utils/token.util");
const refreshTokens = require("../models/authModel");

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

    refreshTokens.push(refreshToken);
  } catch (err) {
    console.log("error: " + err);
    throw new Error("Somtething went wrong!");
  }
};

const refreshToken = (req, res) => {
  const oldrefreshToken = req.refreshToken;

  if (req.tokenError) {
    if (req.tokenError.name === "TokenExpiredError") {
      const index = refreshTokens.indexOf(oldrefreshToken);
      refreshTokens.splice(index, 1);

      res.clearCookie("refreshToken");
      return res.status(401).json({ success: false, error: "Token expired" });
    }

    return res.status(401).json({ success: false, error: "Invalid token" });
  }

  const index = refreshTokens.indexOf(oldrefreshToken);

  refreshTokens.splice(index, 1);

  const { refreshToken, accessToken } = generateTokens(req.user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
  });
  res.json({ success: true, token: accessToken });
  refreshTokens.push(refreshToken);
};

const logoutUser = (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    const isFound = refreshTokens.includes(token);
    if (isFound) {
      const index = refreshTokens.indexOf(token);
      refreshTokens.splice(index, 1);
    }
    res.clearCookie("refreshToken");
  }

  res.json({ success: true, message: "logged out successfully" });
};
module.exports = { registerUser, loginUser, refreshToken, logoutUser };
