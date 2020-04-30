const jwt = require('jsonwebtoken')
const secretKey = "bebas"

const tokenGenerator = (user) => {
    return jwt.sign({
        id:user.id,
        email:user.name
    }, secretKey)
}

module.exports = {
    tokenGenerator
}