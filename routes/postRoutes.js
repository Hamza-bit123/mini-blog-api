const express = require("express");
const upload = require("../configure/multer"); //returns upload = multer({storage , fileFilter, limits})
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/uploads", upload.single("image"), postController.upload);

module.exports = router;
