require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

const generateToken = (data) => {
    return jwt.sign({id: data.id, email: data.email}, secretKey);
}

module.exports = generateToken;