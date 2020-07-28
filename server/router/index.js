const route = require('express').Router()
const todoRoute = require('./todo')
const userControl = require('../controller/userController')


route.post('/register', userControl.register)
route.post('/login', userControl.login)
route.post('/googlelogin', userControl.googleLogin)

route.use('/todos', todoRoute)

module.exports = route