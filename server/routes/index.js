const express = require('express')
const router = express.Router()
const TodoRoutes = require('./todoRoutes')
const UserRoutes = require('./userRoutes')
const CalendarRoutes = require('./calendarRoutes')


router.use('/todos', TodoRoutes)
router.use('/', UserRoutes)
router.use('/calendar', CalendarRoutes)

module.exports = router