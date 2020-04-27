const router = require('express').Router()
const Controller = require('../controllers/TodosController')

// root/todos
router.route('/')
  .get(Controller.getMany)
  .post(Controller.createOne)

// root/todos/:id
router.route('/:id')
  .get(Controller.getOne)
  .put(Controller.updateOne)
  .delete(Controller.removeOne)

module.exports = router