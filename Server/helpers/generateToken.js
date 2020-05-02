require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const { id, email } = user;
  const access_token = jwt.sign({id, email}, process.env.secretKey);
  return access_token;
}

module.exports = generateToken;