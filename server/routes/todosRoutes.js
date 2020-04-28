const router = require('express').Router()
const todosController = require('../controllers/todosController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', todosController.createTodo)
router.get('/', todosController.getTodos)
router.use(authorization)
router.get('/:id', todosController.getTodo)
router.put('/:id', todosController.editTodo)
router.patch('/:id', todosController.editTodo)
router.delete('/:id', todosController.deleteTodo)

module.exports = router