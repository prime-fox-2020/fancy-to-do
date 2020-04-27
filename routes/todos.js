const express = require('express')
const router = express.Router()

const TodosController = require('../controllers/todosController')

router.get('/', TodosController.allTodos)
router.post('/', TodosController.addTodos)
router.get('/:id', TodosController.findTodos)
router.put('/:id', TodosController.updateTodos)
router.delete('/:id', TodosController.deleteTodos)

module.exports = router