const router = require('express').Router()
const { authentication } = require('../middlewares/authentication')
const ProjectController = require('../controllers/ProjectController')

router.use(authentication)

router.get('/', ProjectController.page)
router.get('/:id', ProjectController.findOne)
router.post('/:id/invite', ProjectController.invite)
router.post('/:id', ProjectController.addTodo)
router.post('/', ProjectController.create)
router.delete('/:id', ProjectController.deleteProjectTodo)
module.exports = router