const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
