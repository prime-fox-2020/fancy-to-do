const route = require('express').Router()

const todoController = require('../controller/todoController')

route.get('/', todoController.findAll)
route.post('/', todoController.addTodo)
route.get('/:id', todoController.findByPk)
route.put('/:id', todoController.updateTodo)
route.delete('/:id', todoController.deleteTodo)

module.exports = route