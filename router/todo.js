const router = require('express').Router();
const TodoController = require('../controllers/todoController');

router.post('/', TodoController.addData);
router.get('/', TodoController.getData);
router.get('/:id', TodoController.getDataById);
router.put('/:id', TodoController.editData);
router.delete('/:id', TodoController.delete);

module.exports = router;