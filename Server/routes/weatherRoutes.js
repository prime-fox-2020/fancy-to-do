const router = require('express').Router()
const weatherController = require('../controllers/weatherController')

// console.log("************************8");
router.get('/', weatherController.show)
// console.log("************************8");

module.exports = router