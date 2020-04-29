const express = require('express')
const router = express.Router()
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

const TodosController = require('../controllers/todosController')


router.use(authentication)
router.get('/', TodosController.allTodos)
router.post('/', TodosController.addTodos)
router.get('/:id', TodosController.findTodos)
router.put('/:id', authorization, TodosController.updateTodos)
router.delete('/:id', authorization, TodosController.deleteTodos)

module.exports = router