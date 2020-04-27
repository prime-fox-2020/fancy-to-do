const router = require('express').Router()

const todoController  = require('../controllers/todoController')

router.post('/', todoController.create)

router.get('/', todoController.show)

router.get('/:id', todoController.findById)

router.put('/:id', todoController.update)

router.delete('/:id', todoController.delete)

module.exports = router