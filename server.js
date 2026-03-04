const express = require("express");
const app = express();

const users = require("./models/userModel.js");
const authRoutes = require("./routes/authRoutes.js");
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ users });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
