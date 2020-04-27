const route = require('express').Router()

const userController = require('../controller/userController')

route.post('/registrasi', userController.registrasi)
route.post('/login', userController.login)

module.exports = route