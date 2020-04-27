const jwt = require('jsonwebtoken');
const secretKey = 'h8'

const generateToken = (user) => {
    return jwt.sign({
        id: user.id , email: user.email
    }, secretKey);
}

module.exports = generateToken;