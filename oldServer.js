const jwt = require("jsonwebtoken");
const cors = require("cors");
const Joi = require("joi");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const generateToken = require("./utils/generateTokens");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const users = [];
let refreshTokens = [];
const posts = [];
const registerInputValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  next();
};
const loginInputValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  next();
};
const postInputValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  next();
};

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization && authorization.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, error: "Token not found" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find((user) => user.id === decode.id);
    if (!user)
      return res.status(401).json({ success: false, error: "unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res
        .status(401)
        .json({ success: false, error: "Token expired, login again!" });
    res.status(401).json({ success: false, error: "Invalid token " });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ success: false, error: "Admin only!" });
  next();
};
app.post("/auth/register", registerInputValidation, async (req, res) => {
  const email = users.find((u) => u.email === req.body.email);
  if (email)
    return res
      .status(400)
      .json({ success: false, error: "Email already registered!" });
  const { password, ...rest } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    id: users.length + 1,
    ...rest,
    password: hashedPassword,
    role: "user",
  };

  users.push(user);
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    success: true,
    message: "registered successfully",
    user: userWithoutPassword,
  });
});

app.post("/auth/login", loginInputValidation, async (req, res) => {
  const user = users.find((u) => u.email === req.body.email);

  if (!user)
    return res
      .status(404)
      .json({ success: false, error: "Invalid email or password!" });
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch)
    return res
      .status(404)
      .json({ success: false, error: "Invalid email or password!" });

  const { accessToken, refreshToken } = generateToken(user);

  refreshTokens.push(refreshToken);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.json({ success: true, token: accessToken });
});

app.post("/auth/refresh", (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  if (!oldRefreshToken)
    return res.status(401).json({ success: false, error: "token not found" });

  const isFound = refreshTokens.includes(oldRefreshToken);
  if (!isFound)
    return res
      .status(403)
      .json({ success: false, error: "Please login again " });
  const secret_key = process.env.JWT_SECRET;

  if (!secret_key) throw new Error("JWT_SECRET not set");

  try {
    const decode = jwt.verify(oldRefreshToken, process.env.JWT_SECRET);
    const { iat, exp, ...payload } = decode;
    refreshTokens = refreshTokens.filter((t) => t !== oldRefreshToken);
    const newRefreshToken = jwt.sign(payload, secret_key, { expiresIn: "5m" });
    refreshTokens.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    const accessToken = jwt.sign(payload, secret_key, {
      expiresIn: "1m",
    });
    res.json({ success: true, token: accessToken });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      refreshTokens = refreshTokens.filter((r) => r !== oldRefreshToken);
      return res
        .status(401)
        .json({ success: false, error: "token expired, please login again" });
    }
    res.json({
      success: false,
      error: "Invalid token",
    });
  }
});

app.post("/auth/logout", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
    res.clearCookie("refreshToken");
  }
  res.json({ success: true, message: "Logged out seccussfully" });
});

app.get("/profile", verifyToken, (req, res) => {
  const { password, ...withoutPassword } = req.user;
  res.json({ success: true, user: withoutPassword });
});

app.get("/admin", verifyToken, verifyAdmin, (req, res) => {
  res.json({ success: true, user: req.user });
});

app.post("/posts", verifyToken, postInputValidation, (req, res) => {
  const post = {
    id: posts.length + 1,
    title: req.body.title,
    userId: req.user.id,
  };

  posts.push(post);
  res.json({ success: true, post });
});

app.get("/posts", verifyToken, (req, res) => {
  if (req.user.role === "admin") res.json({ success: true, posts });
  else if (req.user.role === "user") {
    const filteredPosts = posts.filter((p) => p.userId === req.user.id);

    res.json({ success: true, posts: filteredPosts });
  } else {
    res.status(403).json({ success: false, error: "Access forbidden" });
  }
});

app.delete("/posts/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post)
    return res.status(404).json({ success: false, error: "Post not found!" });
  const index = posts.indexOf(post);
  if (req.user.role === "admin") {
    res.json({
      success: true,
      message: "Post deleted successfully!",
      post: posts.splice(index, 1)[0],
    });
  }
  if (req.user.role === "user") {
    if (post.userId !== req.user.id)
      return res
        .status(403)
        .json({ success: false, error: "Access forbidden" });
    res.json({
      success: true,
      message: "message deleted successfully!",
      post: posts.splice(index, 1)[0],
    });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
