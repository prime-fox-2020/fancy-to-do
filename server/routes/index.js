const router = require('express').Router()

const todo = require('./todo')

const user = require('./user')

const charity = require('./charity')

router.use('/todos', todo)
router.use('/users', user)
router.use('/charity', charity)


module.exports = router 