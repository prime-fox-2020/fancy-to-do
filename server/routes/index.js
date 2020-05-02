const router = require('express').Router()
const todosRoutes = require('./todosRoutes')
const projectRoutes = require('./projectRoutes')
const UserController = require('../controllers/UserController')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/projects', projectRoutes)
router.use('/todos', todosRoutes)
router.post('/google-sign', UserController.googleSign)
module.exports = router