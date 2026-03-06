const express = require("express");
const upload = require("../configure/multer"); //returns upload = multer({storage , fileFilter, limits})
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/uploads", upload.single("image"), postController.upload);
router.put("/update/:id", upload.single("image"), postController.updateProfile);

module.exports = router;
