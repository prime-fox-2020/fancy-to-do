const router = require('express').Router()
const todosRouter = require('./todosRouter')
const userRouter = require('./userRouter')
const calendarRouter = require('./calendarRouter')


router.use('/', userRouter)
router.use('/todos', todosRouter)
router.use('/calendar', calendarRouter)

module.exports = router