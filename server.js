const express = require("express");
const cookieParser = require("cookie-parser");
const users = require("./models/userModel.js");
const authRoutes = require("./routes/authRoutes.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/refreshToken", authRoutes);

app.get("/", (req, res) => {
  res.json({ users });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
