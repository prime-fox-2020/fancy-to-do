const router = require('express').Router();
const todos = require('./todos');
const user = require('./user');
const errorHandler = require('../middlewares/error-handler');

router.get('/', (req, res) => res.send("Home"));
router.use('/todos', todos);
router.use('/user', user);
router.use(errorHandler);

module.exports = router;