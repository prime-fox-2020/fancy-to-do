const express = require('express')
const routes = express.Router()

const userRoutes = require('./user-routes.js')
const todoRoutes = require('./todo-routes.js')
const qrRoutes = require('./QR-routes.js')

routes.use('/todos',todoRoutes)
routes.use('/users',userRoutes)
routes.use('/qr',qrRoutes)

module.exports = routes