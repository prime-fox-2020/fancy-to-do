const express = require('express')
const routes = express.Router()
const todoController = require('../controllers/todoController')

routes.get('/todos',todoController.findAll)
routes.post('/todos',todoController.post)

module.exports = routes