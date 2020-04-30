const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const secretKey = process.env.secretKey

const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, email: user.email}, secretKey
    )
}

module.exports = {
    generateToken
}