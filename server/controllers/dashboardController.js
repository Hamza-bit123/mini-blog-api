const pool = require("../configure/db");

const returnUserDashboard = async (req, res) => {
  if (req.user?.role !== "user") return;

  const getTagsSql = `SELECT COUNT(DISTINCT pt.tag_id) AS total_tags FROM post_tags pt
                      JOIN posts p ON p.id = pt.post_id
                      WHERE p.author_id = ?
                      `;
  const getTotalPosts = `SELECT COUNT(DISTINCT id) AS total_posts  ,
                          COUNT(DISTINCT category_id) AS total_categories
                          FROM posts
                          WHERE author_id = ?`;

  const getRecentPosts = `SELECT p.id , p.title, p.category_id, c.name AS category, p.image , p.created_at
                              FROM posts p
                              JOIN categories c ON c.id = p.category_id
                              WHERE p.author_id = ?
                              ORDER BY p.created_at DESC
                              Limit 3
                              `;
  const getTopCategories = `SELECT c.name, COUNT(p.id) as post_count
                                  FROM posts p
                                  JOIN categories c ON c.id = p.category_id
                                  WHERE p.author_id = ?
                                  GROUP BY c.id
                                  ORDER BY post_count DESC
                                  LIMIT 3
                              `;
  const getAuthorSql = `SELECT username FROM users WHERE id = 1`;

  const [total_tags] = await pool.execute(getTagsSql, [req.user?.id]);
  const [total_posts_categories] = await pool.execute(getTotalPosts, [
    req.user?.id,
  ]);
  const [recent_posts] = await pool.execute(getRecentPosts, [req.user?.id]);
  const [top_categories] = await pool.execute(getTopCategories, [req.user?.id]);

  const stats = {
    total_posts: total_posts_categories[0].total_posts,
    total_categories: total_posts_categories[0].total_categories,
    total_tags: total_tags[0].total_tags,
  };

  const author = pool.execute(getAuthorSql);

  res.json({ stats, top_categories, recent_posts, author });
};

module.exports = { returnUserDashboard };
