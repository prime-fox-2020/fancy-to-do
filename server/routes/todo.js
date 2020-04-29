const router = require('express').Router();
const Controller = require('../controllers/todoController');
const authentication = require('../middlewares/authenticate');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.post('/', Controller.create);
router.get('/', Controller.read);
router.get('/:id', authorization, Controller.readById);
router.put('/:id', authorization, Controller.update);
router.delete('/:id',authorization, Controller.delete);


module.exports = router;