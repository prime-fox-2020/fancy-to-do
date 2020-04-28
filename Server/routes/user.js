const route = require('express').Router()
const userControlller = require('../controllers/userController')



route.post('/register', userControlller.register)
route.post('/login', userControlller.login)

module.exports = route