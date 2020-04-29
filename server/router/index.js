const route = require('express').Router()
const todoRoute = require('./todo')
const userControl = require('../controller/userControl')

// middleware


route.post('/register', userControl.register)
route.post('/login', userControl.login)


route.use('/todos', todoRoute)

module.exports = route