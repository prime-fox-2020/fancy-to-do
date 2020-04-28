const jwt = require('jsonwebtoken')
const secretKey = 'saya pengen punya kucing'

const generateToken = (payload) => {
    return jwt.sign({
        id: payload.id, email: payload.email
    }, secretKey)
}

module.exports = generateToken