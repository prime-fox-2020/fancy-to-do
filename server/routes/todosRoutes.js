const router = require('express').Router()
const TodosController = require('../controllers/TodosController')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

router.use(authentication)

router.post('/', TodosController.add)
router.get('/', TodosController.read)
router.get('/:id', authorization, TodosController.findOne)
router.put('/:id', authorization, TodosController.update)
router.delete('/:id', authorization, TodosController.delete)
module.exports = router