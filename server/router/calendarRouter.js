const router = require('express').Router()
const calendar = require('../middlewares/thirdApi')


router.get('/', calendar.getCalendar)

module.exports = router