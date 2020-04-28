const User = require('../models').User
const generateToken = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {

  static register(req, res) {
    const {email, password} = req.body
    User.findOne({where: {email}})
    .then(user => {
      if(user) {
        res.status(400).json({message: "Email already exist"})
      } else {
        return User.create({
          email, password
        })
      }
    })
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      if(err.errors) {
        const msg =[]
        for(let i = 0 ; i < err.errors.length; i++) {
          msg.push(err.errors[i].message)
        }
        res.status(400).json({'Validation Error': msg.join(', ')})
      } else {
        res.status(500).json({message: err.message})
      }
    })
  }

  static login(req, res) {
    const { email, password} = req.body
    const errorMsg = {status:400, message: 'Invalid Email/Password'}

    User.findOne({
      where: {email}
    })
    .then(user => {
      if(!user || !comparePassword(password, user.password)) {
        throw errorMsg
      }
      return user
    })
    .then(user => {
      const access_token = generateToken(user)
      res.status(201).json({access_token})
    })
    .catch(err => {
      if(err.status) {
        res.status(err.status).json({message: err.message})
      }
      res.status(500).json({message: err.message})
    })
  }

}

module.exports = UserController