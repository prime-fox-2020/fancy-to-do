const route = require('express').Router()

const UserController = require('../controllers/UserController')

route.post('/register', UserController.registerUser)
route.post('/login', UserController.loginUser)
route.post('/google-signin', UserController.googleUser) //////


module.exports = route;