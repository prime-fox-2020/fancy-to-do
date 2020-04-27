const router = require('express').Router();
const TodoController = require('../controllers/TodoController');

router.get('/', TodoController.displayAll);
router.get('/:id', TodoController.displayOne);
router.post('/', TodoController.add);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.delete);

module.exports = router;