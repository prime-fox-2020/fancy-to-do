const jwt = require('jsonwebtoken')

const verifyToken = (token) => {
    return jwt.verify(token, process.env.secretKey)
}

module.exports = verifyToken