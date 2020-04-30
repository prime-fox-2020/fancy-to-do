const router = require('express').Router()

const routeTodo = require('./todo')
const routeUser = require('./user')

console.log('Masukk indexxxxx')
router.use('/todos', routeTodo)
router.use('/users', routeUser) //////////

module.exports = router; 