'use strict'
const routes              = require('express').Router()
const userController      = require('../controllers/user')
const { authentication }  = require('../middleware/authAuthor') 

routes.post('/register', userController.register)
routes.post('/login', userController.login)
routes.post('/google-login', userController.otherLogin)
routes.get('/location', authentication, userController.getLocation)

module.exports = routes