const route = require('express').Router()
const todo = require('../controller/todoControl')
const authentication = require('../midlewares/Authentication')
const authorization = require('../midlewares/Authorization')

route.use(authentication)

route.post('/', todo.create)
route.get('/', todo.findAll)


// route.use(authorization)

route.get('/:id', authorization, todo.findById)
route.put('/:id', authorization, todo.update)
route.delete('/:id', authorization, todo.delete)


module.exports = route