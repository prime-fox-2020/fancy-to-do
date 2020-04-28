const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = 'h4cK71v3i6Ht'

const helpers = {

  hashPassword: (password) => {
    const saltRounds = 2
    const hash = bcrypt.hashSync(password, saltRounds)
    return hash
  },
  generateToken: (user) => {
    return jwt.sign({ 
      id: user.id, 
      email: user.email 
    }, secretKey)
  },
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, payload) => {
        if (err) return reject(err)
        resolve(payload)
      })
    })
  }
}

module.exports = helpers