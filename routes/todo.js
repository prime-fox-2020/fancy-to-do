const route = require('express').Router()
const toDoController = require('../controllers/toDoController')

route.get('/', toDoController.show)
route.get('/:id?', toDoController.showOne)
route.post('/', toDoController.addTodo)
route.put('/:id?', toDoController.editTodo)
route.delete('/:id?', toDoController.deleteTodo)

module.exports = route