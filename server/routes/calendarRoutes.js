const express = require('express')
const router = express.Router()
const CalendarController = require('../controller/calendarController')
const authentication = require('../middlewares/authentication')


router.get('/',authentication, CalendarController.getCalendar)

module.exports = router