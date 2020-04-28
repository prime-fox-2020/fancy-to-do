const jwt = require('jsonwebtoken')
const secret = 'jangandihack'

function generateToken (payload){
  let token = jwt.sign(payload, secret)
  return token
}



module.exports = { generateToken }