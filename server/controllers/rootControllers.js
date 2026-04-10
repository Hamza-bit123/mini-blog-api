const express = require("express");

const returnUser = (req, res) => {
  const { id, email, role } = req.user;
  res.json({ success: true, user: { id, email, role } });
};

module.exports = { returnUser };
