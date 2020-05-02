const router = require('express').Router()
const todosController = require('../controllers/todosController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', todosController.create)
router.get('/', todosController.findAll)

router.get('/:id', authorization, todosController.findOne)
router.put('/:id', authorization, todosController.update)
router.delete('/:id', authorization, todosController.destroy)


module.exports = router