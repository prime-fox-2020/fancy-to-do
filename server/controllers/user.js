'use strict'

const { User }          = require('../models')
const { requestToken }  = require('../helper/jwt')
const { cryptCompare }  = require('../helper/bcrypting')

class UserControllers{
  static register(req, res){
    const { email, password } = req.body
    User.create({ email, password })
      .then(user => res.status(201).json(user))
      .catch(err => res.status({
        message: err || 'Internal Server Error'
      }))
  }

  static login(req, res){
    const { email, password } = req.body
    
    User.findOne({
      where: { email }
    })
      .then(user => {
        if(!user || !cryptCompare(password, user)){
          res.status(400).json({message : 'Invalid email / password'})
        }
        return user
      })
      .then(user => {
        const access_token = requestToken(user)
        res.status(200).json({ access_token })
      })
      .catch(err => res.status(500).json({
        message: err.message || 'Internal Server Error'
      }))
  }
}

module.exports = UserControllers