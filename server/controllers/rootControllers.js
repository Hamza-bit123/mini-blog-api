const express = require("express");
const pool = require("../configure/db");

const returnUser = async (req, res) => {
  const { id, email, role } = req.user;
  const sql = "SELECT username FROM users WHERE id = ?";
  const [result] = await pool.execute(sql, [id]);

  res.json({
    success: true,
    user: { id, username: result[0]?.username, email, role },
  });
};

module.exports = { returnUser };
