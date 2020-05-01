const router = require('express').Router()
const projectController = require('../controllers/projectController')


router.post('/', projectController.addProject)
router.get('/', projectController.getProjects)

module.exports = router