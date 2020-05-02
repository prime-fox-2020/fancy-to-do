const routes = require('express').Router()
const userController = require('../controllers/userController.js')


routes.post('/register',userController.register)
routes.post('/login',userController.login)
routes.post('/google-signin',userController.googleSign)
module.exports = routes