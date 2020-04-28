const router = require('express').Router()
const todosRouter = require('./todosRouter')
const pagesRouter = require('./pagesRouter')

router.use('/', pagesRouter)
router.use('/todos', todosRouter)

module.exports = router