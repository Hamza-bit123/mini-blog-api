const pool = require("../configure/db");

const createPost = async (req, res) => {
  let sql = " SELECT id FROM categories WHERE name = ?";

  const [category] = await pool.execute(sql, [req.body.category_id]);
  if (category.length === 0)
    return res.status(400).json({
      success: false,
      error: "Invalid category",
    });
  res.send(category);
};
module.exports = { createPost };
