const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library')
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

  static googleLogin(req, res, next) {
    const token = req.body.id_token
    const CLIENT_ID = process.env.G_CLIENT_ID
    const client = new OAuth2Client(CLIENT_ID)
    let payload, access_token

    client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then(ticket => {
      payload = ticket.getPayload()
      return User.findOne({
        where: {email: payload.email}
      })
    })
    .then(user => {
      if (!user) {
        return User.create({
          first_name: payload.given_name,
          last_name: payload.family_name,
          email: payload.email,
          password: 'gmailcom'
        })
      } else {
        access_token = generateToken(user)
        res.status(200).json({access_token})
      }
    })
    .then(result => {
      if (result) {
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