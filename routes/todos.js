'use strict'
const routes          = require('express').Router()
const todoController  = require('../controllers/todoController')

routes.get('/', todoController.findAll)
routes.post('/', todoController.create)
routes.get('/:id', todoController.findId)
routes.put('/:id', todoController.update)
routes.delete('/:id', todoController.delete)

module.exports = routes