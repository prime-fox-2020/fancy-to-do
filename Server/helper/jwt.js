const jwt = require('jsonwebtoken')
const secretKey = "kopigayonyaenak"

const generateToken = (dataUser) => {
   return jwt.sign({id: dataUser.id, email: dataUser.email}, secretKey)
}

const giveSecretKey = () => {
    return secretKey
}

module.exports = {
    generateToken, giveSecretKey
}