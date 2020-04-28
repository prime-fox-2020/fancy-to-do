const { User } = require('../models')
const bcrypt = require('bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController {
  static register(req,res){
    const {email, password} = req.body
    User.create({
      email, password
    })
    .then(user =>{
      res.status(201).json(user)
    })
    .catch(err =>{
      res.status(400).json({
        message: err.message || 'Bad Request'
      })
    })
  }

  static login(req,res){
    const {email, password} = req.body
    const errorMessage = { status: 400, message: 'Invalid Email / Password'}

    User.findOne({
      where: { email }
    })
    .then(user=>{
      if(!user || !bcrypt.compareSync(password, user.password)){
        throw errorMessage
      }

      return user
    })
    .then(user=>{
      const access_token = generateToken(user)
      res.status(200).json({ access_token })
    })
    .catch(err=>{
      res.status(400).json({
        message: err.message || 'Bad Request'
      })
    })
  }
}


module.exports = UserController