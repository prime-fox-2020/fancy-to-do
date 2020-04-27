const express = require('express')
const router = express.Router()
const todosRoute = require('./todos')

router.use('/', todosRoute)

module.exports = router