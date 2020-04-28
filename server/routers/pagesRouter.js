const router = require('express').Router()
const UsersController = require('../controllers/UsersController')

// root/login
router.route('/login')
  .post(UsersController.login)
  
// root/register
router.route('/register')
  .post(UsersController.register)

module.exports = router