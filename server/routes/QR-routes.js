const routes = require('express').Router()
const QRController = require('../controllers/QrController')

routes.get('/',QRController.getQR)

module.exports = routes 