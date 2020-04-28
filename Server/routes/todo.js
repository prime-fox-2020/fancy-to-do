const router = require('express').Router()
const todosController = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', todosController.findAll) 
router.post('/', todosController.add)
router.get('/:id', authorization, todosController.findByPk)
router.put('/:id', authorization, todosController.update)
router.delete('/:id', authorization, todosController.delete)

module.exports = router