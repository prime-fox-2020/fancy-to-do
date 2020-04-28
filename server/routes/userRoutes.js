const express = require('express')
const routes = express.Router()
const UserController = require('../controller/userController')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)

module.exports = routes