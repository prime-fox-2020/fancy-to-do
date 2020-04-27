const router = require('express').Router()

const routeTodo = require('./todo')

router.use('/todos', routeTodo)

module.exports = router; 