const jwt = require('jsonwebtoken')
const secretKey = "kunci rahasia"

const generateToken = (user) => {
    return jwt.sign({
        id : user.id,
        email : user.email,
        // google_token: user.google_token || ""
    }, secretKey)
}

module.exports = {
    generateToken
}