const router = require('express').Router()
const AppError = require('../helpers/appError')
const todosRouter = require('./todosRouter')
const pagesRouter = require('./pagesRouter')
const moviesRouter = require('./moviesRouter')

router.use('/', pagesRouter)
router.use('/todos', todosRouter)
router.use('/movies', moviesRouter)

router.all('*', (req, res, next) => {
  next(new AppError(`Cant find resources at ${req.originalUrl}`, 404))
})

module.exports = router