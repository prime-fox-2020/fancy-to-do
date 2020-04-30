const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

class UserController {
  
  static register (req, res, next){
    const { email, password} = req.body

    User.findOne({
      where: {email}
    })
    .then(data=>{
      if(data){
        next({name: 'EMAIL_ALREADY_EXIST'})
      } else {
        return User.create({
          email,
          password
        })
      }
    })
    .then(data=>{
      res.status(201).json({
        data: data.id,
        email: data.email,
        password: data.password
      })
    })
    .catch(err=>{
      next(err)
    })
  }

  static login (req, res, next){
    const {email, password} = req.body
    User.findOne({
      where: { email }
    })
    .then(result=>{
      if(result){
        let compare = checkPassword(password, result.password)
        if(compare){
          let token = generateToken(result)
          res.status(201).json({token})
        } else {
          next({name: 'INVALID_PASSWORD'})
        }
      } else {
        next({name: 'INVALID_EMAIL'})
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static googleLogin(req, res, next) {
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
          password: "randomPassword"
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