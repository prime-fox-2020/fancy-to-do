const User = require('../models').User
const generateToken = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);
const randomPassword = process.env.USER_RANDOM_PASSWORD

class UserController {

  static register (req, res, next){
    const {email, password} = req.body

    User.findOne({
      where: {email}
    })
    .then(user=>{
      if(user){
        next({name: 'EMAIL_ALREADY_EXIST'})
      } else {
        return User.create({
          email, password
        })
      }
    })
    .then(user=>{
      res.status(201).json({
        data: user.id,
        email: user.email,
        password: user.password
      })
    })
    .catch(err=>{
      next(err)
    })
  }

  static login(req, res, next) {
    const {email, password} = req.body

    User.findOne({
      where: {email}
    })
    .then(user => {
      if(!user || !comparePassword(password, user.password)) {
        next({name: 'INVALID_EMAIL/PASSWORD'})
      } else {
        const access_token = generateToken(user)
        res.status(201).json({access_token})
      }
    })
    .catch(err => {
      next(err)
    })
  }


  static googleSign(req, res, next) {
    const token = req.body.id_token
    let currentEmail = null

    client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      currentEmail = payload['email'];
      return User.findOne({
        where: {email: currentEmail}
      })
      
    })
    .then(user => {
      if(user) {
        const access_token = generateToken(user)
        res.status(201).json({access_token})
      } else {
        return User.create({
          email: currentEmail,
          password: randomPassword
        })
      }
    })
    .then(newUser => {
      const access_token = generateToken(newUser)
      res.status(201).json({access_token})
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = UserController