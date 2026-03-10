const pool = require("../configure/db");

const createPost = async (req, res) => {
  try {
    const { title, content, category_id, tags } = req.body;
    const image = req.file?.filename || null;
    let sqlGetCategory = " SELECT id FROM categories WHERE id = ?";

    const [category] = await pool.execute(sqlGetCategory, [category_id]);
    if (category.length === 0)
      return res.status(400).json({
        success: false,
        error: "Invalid category",
      });

    sqlInsertTag = "INSERT INTO tags ( name) VALUES (?)";
    sqlGetTag = "SELECT * FROM tags WHERE name = ?";
    const newTags = [];
    tags.forEach(async (tag) => {
      const [newTag] = await pool.execute(sqlGetTag, [tag]);

      if (newTag.length === 0) {
        const [newTag] = await pool.execute(sqlInsertTag, [tag]);
        newTags.push(newTag.insertId);
      } else {
        newTags.push(await newTag[0].id);
      }
      console.log(newTags);
    });

    res.send(newTags);

    sql =
      "INSERT INTO posts (title, content, image, category_id, author_id) VALUES (?,?,?,?,?)";
    const [post] = await pool.execute(sql, [
      title,
      content,
      image,
      category_id,
      req.user?.id,
    ]);

    newTags.forEach(async (newTag) => {
      sql = "INSERT INTO post_tags VALUES (?,?) ";
      await pool.execute(sql, [post.insertId, newTag]);
    });
    res.send(post);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ success: false, error: "Server Error!" });
  }
};
module.exports = { createPost };
