const express = require('express')
const router = express.Router()
const TodoController = require('../controller/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)
router.get('/', TodoController.findAll)
router.post('/', TodoController.addTodo)
router.get('/:id', authorization, TodoController.findById)
router.put('/:id', authorization, TodoController.updateTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router