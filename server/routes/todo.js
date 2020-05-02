const router = require('express').Router();
const todoController = require('../controllers/todoController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/', authentication, todoController.findAll);
router.post('/', authentication,todoController.addData);
router.get('/:id', authentication, authorization,todoController.findByPk);
router.put('/:id', authentication, authorization, todoController.putData);
router.delete('/:id', authentication, authorization, todoController.delete);

module.exports = router;