const router = require('express').Router();
const Controller = require('../controllers/todoController');

router.post('/', Controller.create);
router.get('/', Controller.read);
router.get('/:id', Controller.readById);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.delete);


module.exports = router;