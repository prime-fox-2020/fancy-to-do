const express = require('express')
const routes = express.Router()
const UserController = require('../controller/userController')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/google-sign', UserController.googleSign)

module.exports = routes