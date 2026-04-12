const pool = require("../configure/db");

const returnUserDashboard = async (req, res) => {
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
  const getAuthorSql = `SELECT username FROM users WHERE id = ?`;

  try {
    const [total_tags] = await pool.execute(getTagsSql, [req.user?.id]);
    const [total_posts_categories] = await pool.execute(getTotalPosts, [
      req.user?.id,
    ]);
    const [recent_posts] = await pool.execute(getRecentPosts, [req.user?.id]);
    const [top_categories] = await pool.execute(getTopCategories, [
      req.user?.id,
    ]);

    const stats = {
      total_posts: total_posts_categories[0].total_posts,
      total_categories: total_posts_categories[0].total_categories,
      total_tags: total_tags[0].total_tags,
    };

    const [author] = await pool.execute(getAuthorSql, [req.user?.id]);

    res.json({
      stats,
      top_categories,
      recent_posts,
      user: { author: author[0].username, ...req.user },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const returnAdminDashboard = async (req, res) => {
  const getTotalPosts = "SELECT COUNT(id) AS total_posts  FROM posts";

  const getTotalUsers = "SELECT COUNT (id) AS total_users FROM users";

  const getTotalTags = "SELECT COUNT (id) AS total_tags FROM tags";
  const getTotalCategories =
    "SELECT COUNT (id) AS total_categories FROM categories";
  const getUsername = "SELECT  username FROM users WHERE id = ?";
  const getTopCategories = `SELECT c.name, COUNT(p.id) as post_count
                                  FROM posts p
                                  JOIN categories c ON c.id = p.category_id
                                  GROUP BY c.id
                                  ORDER BY post_count DESC
                                  LIMIT 3
                              `;
  const getRecentPosts = `SELECT p.id , p.title, p.category_id, c.name AS category, p.image , p.created_at
                              FROM posts p
                              JOIN categories c ON c.id = p.category_id
                              ORDER BY p.created_at DESC
                              LIMIT 5
                              `;
  const getRecentUsers =
    "SElECT id, username, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 5";

  try {
    const [totalPosts] = await pool.execute(getTotalPosts);
    const [totalUsers] = await pool.execute(getTotalUsers);
    const [totalTags] = await pool.execute(getTotalTags);
    const [totalCategories] = await pool.execute(getTotalCategories);
    const [username] = await pool.execute(getUsername, [req.user.id]);
    const [topCategories] = await pool.execute(getTopCategories);
    const [recentPosts] = await pool.execute(getRecentPosts);
    const [recentUsers] = await pool.execute(getRecentUsers);

    const stats = {
      totalPosts: totalPosts[0].total_posts,
      totalUsers: totalUsers[0].total_users,
      totalTags: totalTags[0].total_tags,
      totalCategories: totalCategories[0].total_categories,
    };

    const user = { username: username[0].username, ...req.user };

    res.json({
      success: true,
      data: {
        stats,
        user,
        topCategories: topCategories,
        recentPosts: recentPosts,
        recentUsers: recentUsers,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "Server Error" });
  }
};
module.exports = { returnUserDashboard, returnAdminDashboard };
