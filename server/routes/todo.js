const router = require('express').Router();
const todoController = require('../controllers/todoController');

const { authentication } = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')

router.use(authentication)
router.get('/', todoController.findAll)
router.post('/', todoController.create)
router.get('/:id', authorization, todoController.findByPk)
router.put('/:id', authorization, todoController.update)
router.delete('/:id', authorization, todoController.delete)

module.exports = router;
