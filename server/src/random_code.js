const crypto = require("crypto");

const generateRandomCode = () => {
  const code = crypto.randomBytes(3).toString("hex").toUpperCase();
  return code;
};

module.exports = generateRandomCode;
