const router = require('../node_modules/express').Router()
const todosController = require('../controllers/todo')

router.get('/', todosController.findAll)
router.post('/', todosController.add)
router.get('/:id', todosController.findByPk)
router.put('/:id', todosController.update)
router.delete('/:id', todosController.delete)

module.exports = router