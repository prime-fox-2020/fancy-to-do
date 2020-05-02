const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY

let generateToken = (user) => {
    return jwt.sign({
        id: user.id, email: user.email
    }, secretKey)
}

let verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = {
    generateToken,
    verifyToken
}