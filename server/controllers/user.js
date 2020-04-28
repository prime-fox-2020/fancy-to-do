'use strict'

const { User }          = require('../models')
const { requestToken }  = require('../helper/jwt')
const { cryptCompare }  = require('../helper/bcrypting')

class UserControllers{
  static register(req, res, next){
    const { email, password } = req.body
    User.create({ email, password })
      .then(user => res.status(201).json(user))
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
}

module.exports = UserControllers