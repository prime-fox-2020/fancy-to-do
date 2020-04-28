const jwt = require('jsonwebtoken')
const secretKey = 'saya pengen punya kucing'

const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = verifyToken