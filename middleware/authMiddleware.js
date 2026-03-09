const jwt = require("jsonwebtoken");

const verifyRefreshToken = (req, res, next) => {
  console.log("middleware; " + req.token);
};

module.exports = { verifyRefreshToken };
