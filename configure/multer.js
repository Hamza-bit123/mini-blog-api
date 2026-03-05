const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now();
    const extension = path.extname(file.originalname).toLowerCase();

    cb(null, uniqueName + extension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const isValidExt = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  const isValidMime = allowedTypes.test(file.mimetype);

  if (isValidExt && isValidMime) cb(null, true);
  else cb(new Error("Only images are allowed!"));
};

const limits = {
  fileSize: 2 * 1024 * 1024,
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
