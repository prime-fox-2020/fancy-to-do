const router = require('express').Router()

const userController = require('../controller/userController')

router.post('/registrasi', userController.registrasi)
router.post('/login', userController.login)

router.post('/google-sign', userController.googleSign)

module.exports = router