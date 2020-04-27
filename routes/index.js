const router = require('express').Router();
const todos = require('./todos');

router.get('/', (req, res) => res.send("Home"));
router.use('/todos', todos);

module.exports = router;