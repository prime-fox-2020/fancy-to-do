const router = require('express').Router()
const todosController = require('../controllers/todosController')
const { authorization } = require('../middlewares/auth')

router.post('/', todosController.createTodo)
router.get('/', todosController.getTodos)
router.post('/holidays', todosController.holidayCheck)
router.get('/:id', authorization, todosController.getTodo)
router.put('/:id', authorization, todosController.editTodo)
router.patch('/:id', authorization, todosController.editTodo)
router.delete('/:id', authorization, todosController.deleteTodo)

module.exports = router