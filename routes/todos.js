const express = require('express')
const router = express.Router()
const todosControl = require('../controller/todos')

router.get('/', todosControl.getTodos)
router.get('/todos', todosControl.getTodos)
router.post('/todos', todosControl.postTodos)
router.get('/todos/:id', todosControl.getTodosId)
router.put('/todos/:id', todosControl.todosUp)
router.delete('/todos/:id', todosControl.todosDel)

module.exports = router