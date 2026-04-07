const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const path = require("path");
const cors = require("cors");

const app = express();

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/dashboard", dashboardRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
