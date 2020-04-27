const router = require('express').Router()
const TodosController = require('../controllers/TodosController')

router.post('/', TodosController.add)
router.get('/', TodosController.read)
router.get('/:id', TodosController.findOne)
router.put('/:id', TodosController.update)
router.delete('/:id', TodosController.delete)
module.exports = router