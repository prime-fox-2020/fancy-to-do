const router = require('express').Router()
const todo = require('./todo')
const user = require('./user')

router.use('/users', user)
router.use('/todos', todo)

module.exports = router