const router = require('express').Router()

const todo = require('./todo')

const charity = require('./charity')

const userController  = require('../controllers/userController')

router.use('/todos', todo)

router.use('/charity', charity)

router.post('/register', userController.register)

router.post('/login', userController.logIn)

router.post('/google-sign-in', userController.google_sign_in)




module.exports = router 