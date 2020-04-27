const route = require('express').Router()
const TodosController = require('../controllers/todoscontroller')

route.get('/', TodosController.show)
route.post('/', TodosController.add)
route.put('/:id', TodosController.update)
route.delete('/:id', TodosController.delete)

module.exports = route