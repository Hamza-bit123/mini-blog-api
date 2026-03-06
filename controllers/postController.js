const posts = require("../models/postModel");
const path = require("path");
const fs = require("fs");
const db = require("../configure/db");

const upload = async (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, error: "Image not uploaded!" });

  res.json({
    success: true,
    message: "Image uploaded successfully!",
    post: req.file.filename,
  });

  const sql = "INSERT INTO posts ( name, profile) VALUES (?,?)";
  const result = await db.execute(sql, [req.body.name, req.file.filename]);
  console.log(result);
};

const updateProfile = (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, error: "Image not uploaded!" });

  const oldProfile = posts.find((post) => post.id === Number(req.params.id));

  try {
    if (oldProfile) {
      const oldProfilePath = path.join(
        __dirname,
        "../uploads",
        oldProfile?.profile,
      );

      fs.access(oldProfilePath, (err) => {
        if (err) console.log("error: " + err.message);
        else
          fs.unlink(oldProfilePath, (err) => {
            console.log("error: " + err);
          });
      });
    }
    const index = posts.indexOf(oldProfile);
    posts.splice(index, 1);
    const newProfile = {
      id: oldProfile?.id || posts.length + 1,
      name: oldProfile?.name || "default",
      profile: req.file.filename,
    };
    posts.push(newProfile);

    res.json({
      success: true,
      message: "updated successfully",
      post: newProfile,
    });
  } catch (err) {
    res.json({ success: false, error: err.name + ": " + err.message });
  }
};
module.exports = { upload, updateProfile };
