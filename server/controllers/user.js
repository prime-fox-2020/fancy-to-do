'use strict'

const { User }          = require('../models')
const { requestToken }  = require('../helper/jwt')
const { cryptCompare }  = require('../helper/bcrypting')
const { OAuth2Client }  = require('google-auth-library')
const client            = new OAuth2Client(process.env.CLIENT_ID)

class UserControllers{
  static register(req, res, next){
    const { email, password, location } = req.body
    console.log(location)
    User.create({ email, password, location: location })
      .then(user => {
        const access_token = requestToken(user)
        res.status(201).json(access_token)
      })
      .catch(err => next(err))
  }

  static login(req, res, next){
    const { email, password } = req.body
    const error = { name : 'InvalidEmailOrPassword', message: "Invalid Email / Password" }

    User.findOne({
      where: { email }
    })
      .then(user => {
        if(!user || !cryptCompare(password, user)){
          throw error
        }
        return user
      })
      .then(user => {
        const access_token = requestToken(user)
        res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }

  static otherLogin(req, res, next){
    const token = req.body.id_token
    let email
    client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        console.log(ticket)
        const payload = ticket.getPayload()
        email = payload['email']
        return User.findOne({where : { email } })
      })
      .then(user =>{
        if(user){
          const access_token = requestToken(user)
          res.status(200).json({ access_token })
          return
        }else{
          return User.create({
            email: email,
            password: '12345',
            location: null
          })
        }
      })
      .then(user => {
        const access_token = requestToken(user)
        res.status(201).json(access_token)
      })
      .catch(err => console.log(err))
  }
}

module.exports = UserControllers