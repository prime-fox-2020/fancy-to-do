const router = require('express').Router()
const todosRoutes = require('./todosRoutes')
const UserController = require('../controllers/UserController')

router.use('/todos', todosRoutes)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router