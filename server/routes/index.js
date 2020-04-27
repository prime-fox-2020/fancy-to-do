const router = require('express').Router()
const todosRoutes = require('./todosRoutes')

router.use('/todos', todosRoutes)

module.exports = router