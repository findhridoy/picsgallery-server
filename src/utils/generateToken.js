const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const generateToken = (id) =>
  jwt.sign({ id }, SECRET_KEY, { expiresIn: "3 days" });

module.exports = { generateToken };
