const router = require('express').Router()
const todosRoutes = require('./todosRoutes')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const errorHandler = require('../middlewares/errorHandler')
const { authentication } = require('../middlewares/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleSign', userController.googleSign)
router.post('/facebookLogin', userController.facebookLogin)
router.get('/users', authentication, userController.getUsers)
router.post('/project', authentication, projectController.addProject)
router.use('/todos', todosRoutes)
router.use(errorHandler)

module.exports = router