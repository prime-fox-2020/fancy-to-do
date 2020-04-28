'use strict'
const routes                            = require('express').Router()
const todoController                    = require('../controllers/todoController')
const { authorization, authentication } = require('../middleware/authAuthor')

//Authentication Gate
routes.use(authentication)

routes.get('/', todoController.findAll)
routes.post('/', todoController.create)

//Authorization Gate
routes.get('/:id', authorization, todoController.findId)
routes.put('/:id', authorization, todoController.update)
routes.delete('/:id', authorization, todoController.delete)

module.exports = routes