const router = require('express').Router();
const TodoController = require('../controllers/todoController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

//use authentication for all routes
router.use(authentication);

router.post('/', TodoController.addData);
router.get('/', TodoController.getData);
router.get('/:id', authorization, TodoController.getDataById);
router.put('/:id', authorization, TodoController.editData);
router.delete('/:id', authorization, TodoController.delete);

module.exports = router;