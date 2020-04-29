const route = require('express').Router()
const muslimSalatControlller = require('../controllers/muslimSalatController')

route.get('/', muslimSalatControlller.show)

module.exports = route