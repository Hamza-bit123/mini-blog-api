const express = require("express");
const { verifyAccessToken } = require("../middleware/authMiddleware");
const { postSchema } = require("../schemas/schemas");
const validator = require("../validator/validate");
const upload = require("../middleware/uploadMiddleware");
const {
  createPost,
  returnPosts,
  returnPost,
  returnMypost,
  updatePost,
} = require("../controllers/postController");

const router = express.Router();

router.post(
  "/create",
  verifyAccessToken,
  upload.single("image"),
  validator(postSchema),
  createPost,
);

router.get("/", verifyAccessToken, returnPosts);

router.get("/me", verifyAccessToken, returnMypost);

router.get("/:id/", verifyAccessToken, returnPost);

router.patch("/:id", verifyAccessToken, updatePost);

module.exports = router;
