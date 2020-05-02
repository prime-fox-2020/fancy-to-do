const route = require('express').Router()
const ChartController = require('../controllers/apicontroller')

route.get('/charts', ChartController.getCharts)
route.get('/cats', ChartController.getCats)

module.exports = route