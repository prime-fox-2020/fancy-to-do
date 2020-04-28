const router = require('express').Router()
const TodoController = require('../controllers/todo-controller')

router.get('/', TodoController.findAll)
router.get('/:id', TodoController.findById)
router.post('/', TodoController.create)
router.put('/:id', TodoController.update)
router.delete('/:id', TodoController.delete)

module.exports = router