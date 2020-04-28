const router = require('express').Router()
const todosRoutes = require('./todosRoutes')
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/todos', todosRoutes)

module.exports = router