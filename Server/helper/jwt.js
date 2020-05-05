const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
// const secretKey = "kopigayonyaenak"
const secretKey = process.env.secretKey

const generateToken = (dataUser) => {
   return jwt.sign({id: dataUser.id, email: dataUser.email}, secretKey)
}

const giveSecretKey = () => {
    return secretKey
}

module.exports = {
    generateToken, giveSecretKey
}