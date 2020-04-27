const express = require('express')
const router = express.Router()
const TodoRoutes = require('./todoRoutes')

router.use('/todos', TodoRoutes)

module.exports = router