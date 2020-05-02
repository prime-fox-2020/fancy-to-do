const router = require('express').Router()
const Controller = require('../controllers/MoviesController')
const {authentication} = require('../middlewares/authUser')

router.use(authentication)

router.get('/', Controller.main)

module.exports = router