const router = require('express').Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.findAll);
router.post('/', todoController.addData);
router.get('/:id', todoController.findByPk);
router.put('/:id', todoController.putData);
router.delete('/:id', todoController.delete);

module.exports = router;