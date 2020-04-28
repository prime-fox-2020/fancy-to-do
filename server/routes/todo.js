const route = require('express').Router()

const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

const TodoController = require('../controllers/TodoController')

route.use(authentication) //for all

route.get('/', authorization, TodoController.showTodo)
route.post('/', TodoController.addTodo)
route.get('/:id', TodoController.getTodo)

route.put('/:id', authorization, TodoController.updateTodo)
route.delete('/:id', authorization, TodoController.deleteTodo)
 
module.exports = route;