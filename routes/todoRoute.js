const route = require('express').Router()
const todoController = require('../controller/todoController')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

route.get('/:id', todoController.findByPk)
route.put('/:id', todoController.updateTodo)

route.use(authentication)
route.post('/', todoController.addTodo)

route.use(authorization)
route.get('/', todoController.findAll)
route.delete('/:id', todoController.deleteTodo)

module.exports = route