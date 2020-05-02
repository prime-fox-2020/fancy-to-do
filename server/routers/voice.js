const router = require('express').Router()
const VoiceController = require('../controllers/voiceController')

router.use('/:string', VoiceController.getVoiceRSS)

module.exports = router