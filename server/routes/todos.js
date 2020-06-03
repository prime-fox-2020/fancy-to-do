const ToDoRoute = require('express').Router()
const ToDoController = require('../controllers/todos')


const { authentication, authorization } = require('../middlewares/auth')

// ToDoRoute.get('/all',  ToDoController.allList)
ToDoRoute.get('/', authentication ,ToDoController.list)
ToDoRoute.get('/:id', authentication ,ToDoController.find)
ToDoRoute.post('/', authentication ,ToDoController.addTodo)
ToDoRoute.put('/:id', authentication, authorization, ToDoController.updateTodo)
ToDoRoute.delete('/:id', authentication, authorization, ToDoController.deleteTodo)


module.exports = ToDoRoute