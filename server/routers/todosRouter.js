const router = require('express').Router()
const Controller = require('../controllers/TodosController')
const {authentication, authorization} = require('../middlewares/authUser')

router.use(authentication)

// root/todos
router.route('/')
  .get(Controller.getMany)
  .post(Controller.createOne)

// root/todos/:id
router.param('id', authorization)

router.route('/:id')
  .get(Controller.getOne)
  .put(Controller.updateOne)
  .delete(Controller.removeOne)

module.exports = router