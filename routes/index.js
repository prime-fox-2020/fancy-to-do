const router = require('express').Router();
const todos = require('./todos');
const user = require('./user');

router.get('/', (req, res) => res.send("Home"));
router.use('/todos', todos);
router.use('/user', user);

module.exports = router;