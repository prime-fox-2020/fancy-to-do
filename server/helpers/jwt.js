const jwt = require('jsonwebtoken')
const secretKey = 'ramadhan'

const generateToken = (user) =>{
  return jwt.sign( {id : user.id, email: user.email}, secretKey)
}

const verify = (access_token)=>{
  return jwt.verify(access_token, process.env.JWT_SECRET_KEY)
}

module.exports = {generateToken, verify}