const route = require('express').Router();

const userController = require('../controller/userCont');

route.post('/register', userController.register)
route.post('/login', userController.login)
route.post('/login/google', userController.loginGoogle)

module.exports = route;
