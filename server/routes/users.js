const route = require('express').Router()
const UsersController = require('../controllers/userscontroller')

route.post('/register', UsersController.register)
route.post('/login', UsersController.login)

module.exports = route