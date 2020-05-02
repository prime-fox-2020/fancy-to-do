const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.SECRET_KEY

const generateToken = (user) =>{
    return jwt.sign(
        { id: user.id, email: user.email },
        secretKey
    )
}

module.exports = {
    generateToken
}