const router = require('express').Router()
const speechController = require('../controllers/speechController')

router.get('/:string', speechController.speech)

module.exports = router