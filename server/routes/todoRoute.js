const router = require('express').Router()
const todoController = require('../controller/todoController')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')


router.use(authentication)
router.use(authorization)

router.post('/', todoController.addTodo)
router.get('/:id', todoController.findByPk)
router.get('/', todoController.findAll)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

module.exports = router