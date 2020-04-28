'use strict'
const jwt         = require('jsonwebtoken')
const privateKey  =  'hanyaSaja'

const requestToken = user => {
  return jwt.sign({ 
    id    : user.id, 
    email : user.email 
  }, privateKey) 
}

module.exports =  { requestToken }