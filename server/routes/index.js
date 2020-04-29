const router = require('express').Router()

const todo = require('./todo')

const user = require('./user')

const charity = require('./charity')

router.use('/todo', todo)
router.use('/user', user)
router.use('/charity', charity)


module.exports = router 