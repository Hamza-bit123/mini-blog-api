const express = require("express");
const { verifyAccessToken } = require("../middleware/authMiddleware");
const { postSchema, patchSchema } = require("../schemas/schemas");
const validator = require("../validator/validate");
const upload = require("../middleware/uploadMiddleware");
const {
  createPost,
  returnPosts,
  returnPost,
  returnMyposts,
  updatePost,
  deletePost,
  checkQuery,
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

router.get("/me", verifyAccessToken, returnMyposts);

router.get("/:id/", verifyAccessToken, returnPost);

router.patch(
  "/:id",
  verifyAccessToken,
  upload.single("image"),
  validator(patchSchema),
  updatePost,
);

router.delete("/:id", verifyAccessToken, deletePost);

module.exports = router;
