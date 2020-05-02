const router = require('express').Router()

const routeTodo = require('./todo')
const routeUser = require('./user')

router.use('/todos', routeTodo)
router.use('/users', routeUser) //////////

module.exports = router; 