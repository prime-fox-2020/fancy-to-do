const router = require('express').Router()
const UserController = require('../controllers/user')

router.post('/signin', UserController.signin)
router.post('/googleSignIn', UserController.googleSignIn)
router.post('/signup', UserController.signup)

module.exports = router