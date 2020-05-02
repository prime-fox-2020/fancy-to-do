
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY                     //explicit content

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email }, 
        secretKey
    )
}

module.exports = { generateToken };