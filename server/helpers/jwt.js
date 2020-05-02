const jwt = require('jsonwebtoken')
const secret = process.env.secret

function generateToken (payload){
  let token = jwt.sign({
    id: payload.id,
    email: payload.email
  }, secret)
  return token
}

module.exports = { generateToken }