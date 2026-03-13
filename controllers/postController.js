const { error } = require("console");
const pool = require("../configure/db");
const fs = require("fs");

const createPost = async (req, res) => {
  const { title, content, category_id, tags } = req.body;
  const image = req.file?.filename || null;
  const arrayTags = tags?.map((tag) => [tag]);

  const placeholders = tags?.map(() => "?").join(",");

  //Queries
  const getCategory_id = "SELECT id FROM categories WHERE id = ?";

  const getTags = `SELECT id FROM tags WHERE name IN(${placeholders})`;

  const postInsert =
    "INSERT INTO posts (title, content, image, category_id, author_id) VALUES (?,?,?,?,?)";

  const tagInsert = "INSERT IGNORE INTO tags (name) VALUES ?";

  const post_tagInsert = "INSERT INTO post_tags (post_id, tag_id) VALUES ?";

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    //Check category id validity
    const [category] = await conn.execute(getCategory_id, [category_id]);

    if (category.length === 0)
      return res
        .status(400)
        .json({ success: false, error: "Invalid category id" });

    const [postsResult] = await conn.execute(postInsert, [
      title,
      content,
      image,
      category_id,
      req.user?.id,
    ]);

    await conn.query(tagInsert, [arrayTags]);

    const [tagIds] = await conn.execute(getTags, tags);

    const relation = tagIds.map((t) => [postsResult.insertId, t.id]);

    const [post_tagResult] = await conn.query(post_tagInsert, [relation]);

    await conn.commit();

    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      post: {
        id: postsResult.insertId,
        title,
        content,
        image,
        category_id,
        author_id: req.user.id,
        tags,
      },
      relation,
      relations: post_tagResult,
    });
  } catch (error) {
    console.log(error.message);
    await conn.rollback();

    //delete image if uploaded

    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log({ error: err.message });
      });
    }

    res.status(500).json({ success: false, error: "Server Error!" });
  } finally {
    conn.release();
  }
};

const returnPosts = async (req, res) => {
  const sql = `SELECT p.id, title, content ,image, c.id AS category_id, c.name AS category, p.created_at, u.id AS author_id, u.username AS author, GROUP_CONCAT(t.name)  AS tags 
              FROM posts p
              JOIN users u ON u.id = p.author_id
              JOIN categories c ON c.id = p.category_id
              LEFT JOIN post_tags pt ON pt.post_id = p.id
              LEFT JOIN tags t ON t.id = pt.tag_id
              GROUP BY p.id
              ORDER BY p.created_at DESC`;

  try {
    const [posts] = await pool.execute(sql);

    const formattedPosts = posts?.map((p) => ({
      ...p,
      tags: p.tags ? p.tags.split(",") : [],
    }));

    res.json({ success: true, data: formattedPosts });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const returnMypost = async (req, res) => {
  const sql = `SELECT p.id, title, content ,image, c.id AS category_id, c.name AS category, p.created_at, u.id AS author_id, u.username AS author, GROUP_CONCAT(t.name)  AS tags 
              FROM posts p
              JOIN users u ON u.id = p.author_id
              JOIN categories c ON c.id = p.category_id
              LEFT JOIN post_tags pt ON pt.post_id = p.id
              LEFT JOIN tags t ON t.id = pt.tag_id
              WHERE p.author_id = ?
              GROUP BY p.id
              ORDER BY p.created_at DESC`;

  try {
    const user_id = req.user?.id;

    const [posts] = await pool.execute(sql, [user_id]);

    const formattedPosts = posts?.map((p) => ({
      ...p,
      tags: p.tags ? p.tags.split(",") : [],
    }));

    res.json({ success: true, data: formattedPosts });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const returnPost = async (req, res) => {
  const sql = `SELECT p.id, p.title, p.content, p.image , c.id AS category_id, c.name AS category, p.created_at , u.id AS author_id, u.username AS author, GROUP_CONCAT(t.name)  AS tags 
              FROM posts p
              JOIN users u ON u.id = p.author_id
              JOIN categories c ON c.id = p.category_id
              LEFT JOIN post_tags pt ON pt.post_id = p.id
              LEFT JOIN tags t ON t.id = pt.tag_id
              WHERE p.id = ?
              GROUP BY p.id`;

  const post_id = req.params.id;

  try {
    const [post] = await pool.execute(sql, [post_id]);

    if (post.length === 0)
      return res
        .status(404)
        .json({ success: false, error: "Resource not found!" });

    const formattedPost = {
      ...post[0],
      tags: post[0].tags ? post[0].tags.split(",") : [],
    };

    res.json({ success: true, data: formattedPost });
  } catch (error) {
    console.log("Error: " + error.name + " " + error.message);
    res.status(500).json({ success: false, error: "Server error!" });
  }
};

const updatePost = async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.user.id;

  const getPostSql = "SELECT id FROM posts WHERE id = ?  AND author_id = ?";

  const conn = await pool.getConnection();
  conn.beginTransaction();
  try {
    const [post] = await conn.execute(getPostSql, [post_id, user_id]);

    if (post.length === 0)
      return res
        .status(404)
        .json({ success: false, error: "Resource not found!" });

    res.send(req.body);
  } catch (error) {
    console.log("Error: " + error.message);
    await conn.rollback();
    res.status(500).json({ success: false, error: "Server error!" });
  } finally {
    conn.release();
  }
};

module.exports = {
  createPost,
  returnPosts,
  returnMypost,
  returnPost,
  updatePost,
};
