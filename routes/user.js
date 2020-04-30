const userRoute = require('express').Router()
const userController = require('../controllers/user')
const jwt = require('jsonwebtoken')

//Middleware functions
const authentication = (req,res,next) => {
}
const authorization = (req,res,next) => {

}

userRoute.post('/register', userController.register)
userRoute.post('/login', userController.login)

module.exports = userRoute