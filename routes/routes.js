const router = require('express').Router()
const toDoController = require('../controllers/toDoController')

router.get('/', toDoController.readTodo)
router.get('/:id', toDoController.readTodoById)
router.post('/', toDoController.createTodo)
router.put('/:id', toDoController.updateTodo)
router.delete('/:id', toDoController.deleteTodo)

module.exports = router