const jwt = require ('jsonwebtoken')

const generateToken = user => {
    return jwt.sign({
        userId: user.id
    }, process.env.secret_token)
}

module.exports = generateToken