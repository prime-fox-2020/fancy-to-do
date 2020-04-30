const router = require('express').Router()
const todosRoutes = require('./todosRoutes')
const userController = require('../controllers/userController')
const errorHandler = require('../middlewares/errorHandler')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleSign', userController.googleSign)
router.post('/facebookLogin', userController.facebookLogin)
router.use('/todos', todosRoutes)
router.use(errorHandler)

module.exports = router