const route = require('express').Router()
const toDoController = require('../controllers/toDoController')
const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')

route.get('/', authentication, toDoController.show)
route.get('/:id', toDoController.showOne)
route.post('/', authentication, toDoController.addTodo)
route.put('/:id', authentication, authorization, toDoController.editTodo)
route.delete('/:id', authentication, authorization, toDoController.deleteTodo)

module.exports = route