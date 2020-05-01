const router = require('express').Router()

const userController  = require('../controllers/userController')


router.post('/login', userController.logIn)

router.post('/register', userController.register)

router.post('/google-sign-in', userController.google_sign_in)

module.exports = router