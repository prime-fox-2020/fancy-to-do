'use strict'
const routes          = require('express').Router()
const userController  = require('../controllers/user') 

routes.post('/register', userController.register)
routes.post('/login', userController.login)
routes.post('/google-login', userController.otherLogin)

module.exports = routes