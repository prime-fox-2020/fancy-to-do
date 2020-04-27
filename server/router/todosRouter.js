const router = require('express').Router()
const todosController = require('../controllers/todosController')

router.post('/', todosController.create)
router.get('/', todosController.findAll)
router.get('/:id', todosController.findOne)
router.put('/:id', todosController.update)
router.delete('/:id', todosController.destroy)


module.exports = router