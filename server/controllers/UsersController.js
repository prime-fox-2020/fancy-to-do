const bcrypt = require('bcrypt')
const {generateToken} = require('../helpers')
const {User} = require('../models')
const AppError = require('../helpers/appError')

class UsersController {
  
  static login(req, res, next) {
    const {email, password} = req.body
    let access_token
    if (!email || !password) next(new AppError('Invalid Email / Password', 401))

    User.findOne({where: {email}}).then(result => {
      if (!result || !bcrypt.compareSync(password, result.password)) {
        next(new AppError('Invalid Email / Password', 401))
      } else {
        access_token = generateToken(result)
        res.status(200).json({access_token})
      }
    })
    .catch(err => next(err))
  }

  static register(req, res, next) {
    const {first_name, last_name, password, email} = req.body

    User.findOne({where: {email}}).then(result => {

      if (result) return next(new AppError('Email address already used by other user', 400))
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
    .catch(err => next(err))
  }
}

module.exports = UsersController