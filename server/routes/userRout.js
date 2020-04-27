const route = require('express').Router();

const userController = require('../controller/userCont');

route.post('/register', userController.register)
route.post('/login', userController.login)

module.exports = route;
