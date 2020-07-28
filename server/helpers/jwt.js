const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

// sign
const generateToken = (user) => {
  return jwt.sign(
    {id: user.id, email: user.email},
    secretKey
  )
}

// verify
const verifyToken = (access_token) => {
  return jwt.verify(access_token, secretKey)
}


module.exports = {generateToken, verifyToken}