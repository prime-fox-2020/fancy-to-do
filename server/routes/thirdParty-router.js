const router = require('express').Router()
const CalendarController = require('../controllers/thirdParty-controller.js')

router.get('/', CalendarController.showsCallendar)

module.exports = router