const router = require('express').Router()
const todoController = require('../controller/todoController')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

router.get('/:id', todoController.findByPk)
router.put('/:id', todoController.updateTodo)

router.use(authentication)
router.post('/', todoController.addTodo)

router.use(authorization)
router.get('/', todoController.findAll)
router.delete('/:id', todoController.deleteTodo)

module.exports = router