const express = require("express");
const { verifyAccessToken } = require("../middleware/authMiddleware");
const { postSchema, patchSchema } = require("../schemas/schemas");
const validator = require("../validator/validate");
const upload = require("../middleware/uploadMiddleware");
const {
  createPost,
  returnPosts,
  returnPost,
  returnMypost,
  updatePost,
  deletePost,
  test,
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

router.patch(
  "/:id",
  verifyAccessToken,
  upload.single("image"),
  validator(patchSchema),
  updatePost,
);

router.delete("/:id", verifyAccessToken, deletePost);

router.get("/test/:query", verifyAccessToken, test);

module.exports = router;
