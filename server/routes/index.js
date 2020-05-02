const router = require('express').Router();
const todo = require('./todo');
const user = require('./user');

router.use('/todos', todo);
router.use('/users', user);

module.exports = router;