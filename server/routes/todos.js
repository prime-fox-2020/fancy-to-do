const router = require('express').Router();
const TodoController = require('../controllers/TodoController');
const {authentication, authorization} = require('../middlewares/auth');

router.use(authentication);
router.get('/', TodoController.displayAll);
router.get('/:id', authorization, TodoController.displayOne);
router.post('/', TodoController.add);
router.put('/:id', authorization, TodoController.update);
router.delete('/:id', authorization, TodoController.delete);

module.exports = router;