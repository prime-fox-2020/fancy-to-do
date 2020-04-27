const router = require('express').Router()
const TodoController = require('../controllers/todo')

router.post('/', TodoController.create)
router.get('/', TodoController.getAll)
router.get('/:id', TodoController.getById)
router.put('/:id', TodoController.edit)
router.delete('/:id', TodoController.delete)

module.exports = router