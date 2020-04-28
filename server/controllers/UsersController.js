const bcrypt = require('bcrypt')
const {generateToken} = require('../helpers')
const {User} = require('../models')

class UsersController {
  
  static login(req, res) {
    const {email, password} = req.body
    let access_token

    User.findOne({where: {email}}).then(result => {
      if (!result || !bcrypt.compareSync(password, result.password)) {
        res.status(400).json({error: {message: 'Invalid Email / Password'}})
      } else {
        access_token = generateToken(result)
        res.status(200).json({access_token})
      }
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
  }

  static register(req, res) {
    const {first_name, last_name, password, email} = req.body

    User.findOne({where: {email}}).then(result => {
      if (result) return res.status(400).json({error: {message: 'Email address already used by other user'}})
      return User.create({
        first_name,
        last_name,
        password,
        email
      })
    })
    .then(result => {
      const {id, email, password} = result
      res.status(201).json({id, email, password})
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        let errors = err.errors.map(el => el.message)
        res.status(400).json({error: errors})
      } else {
        res.status(500).json({error: err})
      }
    })
  }
}

module.exports = UsersController