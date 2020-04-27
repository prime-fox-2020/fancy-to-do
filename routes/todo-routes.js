const express = require('express')
const routes = express.Router()
const todoController = require('../controllers/todoController')

routes.get('/todos',todoController.findAll)
routes.post('/todos',todoController.postNew)
routes.put('/todos/:id',todoController.updateList)
routes.delete('/todos/:id',todoController.deleteList)
module.exports = routes