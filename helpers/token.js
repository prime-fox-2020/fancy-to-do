const jwt = require('jsonwebtoken')

function generateToken (user) {
    const secretKey = 'hacktiv'
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
    }, secretKey)
}

function getUserData (token) {
    const secretKey = 'hacktiv'
    return jwt.verify(token, secretKey)
}

module.exports = {
    generateToken,
    getUserData
}