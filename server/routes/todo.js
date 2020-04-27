const route = require('express').Router()

const TodoController = require('../controllers/TodoController')

route.post('/', TodoController.addTodo)
route.get('/', TodoController.showTodo)
route.get('/:id', TodoController.getTodo)
route.put('/:id', TodoController.updateTodo)
route.delete('/:id', TodoController.deleteTodo)
 
module.exports = route;