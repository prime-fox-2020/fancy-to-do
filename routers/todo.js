const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')

router.use(authentication)
router.get('/', TodoController.show)
router.get('/:id', TodoController.showIndividual)
router.post('/', TodoController.addTodo)
router.put('/:id', authorization, TodoController.editTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router