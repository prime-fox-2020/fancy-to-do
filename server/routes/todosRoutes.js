const router = require('express').Router()
const todosController = require('../controllers/todosController')
const { authentication, authorization } = require('../middlewares/auth')

router.post('/', authentication, todosController.createTodo)
router.get('/', authentication, todosController.getTodos)
router.get('/:id', authentication, authorization, todosController.getTodo)
router.put('/:id', authentication, authorization, todosController.editTodo)
router.delete('/:id', authentication, authorization, todosController.deleteTodo)

module.exports = router