const express = require('express')
const router = express.Router()
const TodoController = require('../controller/todoController')

router.get('/', TodoController.findAll)
router.post('/', TodoController.addTodo)
router.get('/:id', TodoController.findById)
router.put('/:id', TodoController.updateTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router