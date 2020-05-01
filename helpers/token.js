const jwt = require('jsonwebtoken')

function generateToken (user) {
    const secretKey = process.env.JWT_SECRET_KEY
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
    }, secretKey)
}

function getUserData (token) {
    const secretKey = process.env.JWT_SECRET_KEY
    return jwt.verify(token, secretKey)
}

module.exports = {
    generateToken,
    getUserData
}