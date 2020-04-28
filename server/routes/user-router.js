const router = require('express').Router()
const UserController = require('../controllers/user-controller.js')

router.get('/', UserController.showUsers)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.delete('/:id', UserController.deleteUser)

module.exports = router