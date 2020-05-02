require('dotenv').config();
const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
  const { access_token } = req.headers;

  try {
    const decoded = jwt.verify(access_token, process.env.secretKey);
    console.log(decoded);
    req.userData = decoded;
    next();
  } catch(err) {
    res.status(400).json({message: err.message || 'Failed to authenticate'});
  }
}

module.exports = authentication;