const express = require('express')
const routes = express.Router()

const todoRoutes = require('./todo-routes.js')

routes.use('/todos',todoRoutes)

module.exports = routes