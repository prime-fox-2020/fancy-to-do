const router = require('express').Router()
const TodoController = require('../controllers/todo-controller')
const authentication = require('../middlewares/authentication')

router.get('/', TodoController.findAll)
router.get('/:id', TodoController.findById)
router.post('/', authentication, TodoController.create)
router.put('/:id', authentication, TodoController.update)
router.delete('/:id', TodoController.delete)

module.exports = router 