const jwt = require('jsonwebtoken');
const secretKey = 'biasa saja';

const generateToken = (data) => {
    return jwt.sign({id: data.id, email: data.email}, secretKey);
}

module.exports = generateToken;