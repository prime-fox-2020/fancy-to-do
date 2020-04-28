const jwt = require('jsonwebtoken')
const secretKey = 'lolikeano'

const generateToken = (data) => {
  return jwt.sign({id: data.id, email: data.email}, secretKey)
}

module.exports = {generateToken}