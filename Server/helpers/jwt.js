const jwt = require('jsonwebtoken')

const verifyToken = (token) => {
    return jwt.verify(token, process.env.secretKey)
}


const generateToken = (user) => {
    return jwt.sign({
        id: user.id, email: user.email
    }, process.env.secretKey)
}

module.exports = {generateToken, verifyToken}