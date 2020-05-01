const router = require('express').Router()
const todosRoutes = require('./todosRoutes')
const projectRoutes = require('./projectRoutes')
const userController = require('../controllers/userController')
const errorHandler = require('../middlewares/errorHandler')
const { authentication } = require('../middlewares/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleSign', userController.googleSign)
router.post('/facebookLogin', userController.facebookLogin)
router.use(authentication)
router.get('/users', userController.getUsers)
router.use('/project', projectRoutes)
router.use('/todos', todosRoutes)
router.use(errorHandler)

module.exports = router