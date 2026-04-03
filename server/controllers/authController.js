const hash = require("../utils/hash");
const pool = require("../configure/db");
const bcrypt = require("bcryptjs");
const generateTokens = require("../utils/generateTokens");
const verifyToken = require("../utils/jwt");

const registerUser = async (req, res) => {
  try {
    const { password, username, email } = req.body;

    let sql = "SELECT id FROM users WHERE email = ?";
    const [id] = await pool.execute(sql, [email]);

    if (id.length > 0)
      return res
        .status(400)
        .json({ success: false, error: "Email already exists!" });

    const hashedPassword = await hash(password);

    sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
    const [result] = await pool.execute(sql, [username, email, hashedPassword]);

    const user = { id: result.insertId, username, email, role: "user" };
    res.status(201).json({
      success: true,
      message: "registered successfully!",
      user,
    });
  } catch (err) {
    console.log("error: " + err.message);

    res.status(500).json({ success: false, error: "server error!" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    let sql = "SELECT id, email,role, password FROM users WHERE email = ?";
    const [result] = await pool.execute(sql, [email]);

    if (result.length === 0)
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, result[0].password);

    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });

    const { accessToken, refreshToken } = generateTokens(result[0]);
    const hashedRefreshToken = await hash(refreshToken);

    sql = "SELECT id FROM refresh_tokens WHERE user_id = ?";
    const [tokenRecord] = await pool.execute(sql, [result[0].id]);

    if (tokenRecord.length === 0) {
      sql = "INSERT INTO refresh_tokens (user_id, token)VALUES (?,?)";

      await pool.execute(sql, [result[0].id, hashedRefreshToken]);
    } else {
      sql = "UPDATE `refresh_tokens` SET `token` = ? WHERE user_id = ?";
      await pool.execute(sql, [hashedRefreshToken, result[0].id]);
    }

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      accessToken,
    });
  } catch (err) {
    console.log("error: " + err.message);
    res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({
        success: false,
        error: "refresh token not found!",
      });

    const { error, decode } = verifyToken(refreshToken);
    if (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({
          success: false,
          error: "Server Error. Please try again latter!",
        });
      }
      if (error.name === "TokenExpiredError")
        return res.status(401).json({ success: false, error: error.message });

      return res.status(403).json({ success: false, error: error.message });
    }

    let sql = "SELECT id FROM refresh_tokens WHERE user_id = ?";

    const [result] = await pool.execute(sql, [decode.id]);

    if (result.length === 0)
      return res.status(401).json({
        success: false,
        error: "Invalid token",
      });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      generateTokens(decode);

    sql = "UPDATE refresh_tokens SET token = ? WHERE user_id = ?";

    const hashedRefreshToken = await hash(newRefreshToken);
    await pool.execute(sql, [hashedRefreshToken, decode.id]);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.log("error: " + err.message);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const { error, decode } = verifyToken(refreshToken);
    if (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).json({
          success: false,
          error: "Server Error. Please try again latter!",
        });
      }
      if (error.name === "TokenExpiredError")
        return res.status(401).json({ success: false, error: error.message });

      return res.status(403).json({ success: false, error: error.message });
    }

    const sql = "DELETE FROM refresh_tokens WHERE user_id = ?";
    await pool.execute(sql, [decode.id]);

    res.clearCookie("refreshToken");

    res.json({ success: false, message: "Logged out successfully" });
  }
};
module.exports = { registerUser, loginUser, refreshToken, logoutUser };
