const bcrypt = require("bcryptjs");

const hashString = async (string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(string, salt);
  } catch (err) {
    throw err;
  }
};

module.exports = hashString;
