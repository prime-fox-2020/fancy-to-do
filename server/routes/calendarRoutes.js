const express = require('express')
const router = express.Router()
const CalendarController = require('../controller/calendarController')


router.get('/', CalendarController.getCalendar)

module.exports = router