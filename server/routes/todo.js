const router = require('express').Router();

const todoController = require('../controllers/todoController');

const authentication = require('../middlewares/authentication')

const authorization = require('../middlewares/authorization')


router.use(authentication)

router.post('/', todoController.create);

router.get('/', todoController.show);



router.get('/:id',authorization, todoController.findById);

router.put('/:id',authorization, todoController.update);

router.delete('/:id',authorization, todoController.delete);

module.exports = router;
