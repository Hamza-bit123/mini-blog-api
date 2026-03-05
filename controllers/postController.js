const posts = require("../models/postModel");

const upload = (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, error: "Image not uploaded!" });

  posts.push(req.file.filename);
  res.json({
    success: true,
    message: "Image uploaded successfully!",
    post: req.file.filename,
  });
};

module.exports = { upload };
