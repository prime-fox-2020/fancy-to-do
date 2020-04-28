const router = require('express').Router()
const Controller = require('../controllers/TodosController')
const {authentication, authorization} = require('../middlewares/authUser')


// root/todos
router.use(authentication)
router.route('/')
  .get(Controller.getMany)
  .post(Controller.createOne)

// root/todos/:id
router.route('/:id')
  .get(authorization, Controller.getOne)
  .put(authorization, Controller.updateOne)
  .delete(authorization, Controller.removeOne)

module.exports = router