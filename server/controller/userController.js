const User = require('../models').User
const generateToken = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

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

}

module.exports = UserController