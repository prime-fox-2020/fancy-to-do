const router = require('express').Router()
const todosRoutes = require('./todosRoutes')
const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use('/todos', todosRoutes)

module.exports = router