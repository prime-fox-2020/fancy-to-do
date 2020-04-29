const router = require('express').Router()

const charityController  = require('../controllers/charityController')


router.get('/', charityController.show)


module.exports = router