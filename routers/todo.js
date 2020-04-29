const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')

router.use(authentication)
router.get('/', TodoController.show)
router.post('/', TodoController.addTodo)
router.get('/:id', authorization, TodoController.showIndividual)
router.put('/:id', authorization, TodoController.editTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router