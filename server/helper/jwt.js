'use strict'
const jwt         = require('jsonwebtoken')

const requestToken = user => {
  return jwt.sign({ 
    id        : user.id, 
    email     : user.email 
  }, process.env.PRIVATE_KEY) 
}

module.exports =  { requestToken }