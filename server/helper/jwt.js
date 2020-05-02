const jwt = require('jsonwebtoken')
const secretKey = 'wololo'
const tokenGen = (user) => {
    return jwt.sign({id: user.id, email: user.email}, secretKey)
}

module.exports = {
    tokenGen
}