const router = require('../node_modules/express').Router()
const todo = require('./todo')

router.use('/todos' ,todo)

module.exports = router