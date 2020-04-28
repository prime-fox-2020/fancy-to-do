'use strict'
const bcrypt      = require('bcrypt')
const saltRounds  = 2;

const crypting = user => {
  return bcrypt.hashSync(user.password, saltRounds)
}

const cryptCompare = (password, user) => {
  return bcrypt.compareSync(password, user.password)
}


module.exports = {
  crypting,
  cryptCompare
}