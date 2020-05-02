const router = require('express').Router()
const toDoController = require('../controllers/toDoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', toDoController.readTodo)
router.post('/', toDoController.createTodo)

// router.use(authorization) 
router.get('/:id',authorization, toDoController.readTodoById)
router.put('/:id',authorization, toDoController.updateTodo)
router.delete('/:id',authorization, toDoController.deleteTodo)

module.exports = router