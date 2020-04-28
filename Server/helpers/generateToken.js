const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign({
        id: payload.id, email: payload.email
    }, process.env.secretKey)
}

module.exports = generateToken