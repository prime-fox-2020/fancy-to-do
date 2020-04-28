const router = require('express').Router()
const TodoController = require('../controllers/todo-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', authentication, TodoController.findAll)
router.get('/:id', authentication, authorization, TodoController.findById)
router.post('/', authentication, TodoController.create)
router.put('/:id', authentication, authorization, TodoController.update)
router.delete('/:id', authentication, authorization, TodoController.delete)

module.exports = router 