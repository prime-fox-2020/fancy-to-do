
const jwt = require('jsonwebtoken')

const secretKey = 'rahasia'                     //explicit content

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email }, 
        secretKey
    )
}

module.exports = { generateToken };