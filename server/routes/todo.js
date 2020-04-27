const router = require('express').Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.findAll)
router.post('/', todoController.create)
router.get('/:id', todoController.findByPk)
router.put('/:id', todoController.update)
router.delete('/:id', todoController.delete)

module.exports = router;
