'use strict'
const routes  = require('express').Router()
const wAPICon = require('../controllers/weatherAPI')

routes.get('/', wAPICon.getWeather)

module.exports = routes