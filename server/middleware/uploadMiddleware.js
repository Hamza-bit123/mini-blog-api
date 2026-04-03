const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniquename =
      Date.now() + path.extname(file.originalname).toLowerCase();
    cb(null, uniquename);
  },
});
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;

  const isValidExt = allowed.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const isValidMime = allowed.test(file.mimetype);

  if (isValidExt && isValidMime) cb(null, true);
  else cb(new Error("Only image"), null);
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};
const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
