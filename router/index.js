const router = require('express').Router();
const todo = require('./todo');

router.get('/', (req, res) => {
  res.send('oke');
})

router.use('/todos', todo);

module.exports = router;