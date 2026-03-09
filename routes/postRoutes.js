const express = require("express");
const { verifyAccessToken } = require("../middleware/authMiddleware");
const { postSchema } = require("../schemas/schemas");
const validator = require("../validator/validate");
const upload = require("../middleware/uploadMiddleware");
const { createPost } = require("../controllers/postController");

const router = express.Router();

router.post(
  "/create",
  verifyAccessToken,
  validator(postSchema),
  upload.single("image"),
  createPost,
);
module.exports = router;
