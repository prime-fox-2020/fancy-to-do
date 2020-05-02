const router = require('express').Router();
const todo = require('./todo');
const user = require('./user');
const qr = require('./qr');

router.get('/', (req, res) => {
  res.send('oke');
})

router.use('/', user);
router.use('/todos', todo);
router.use('/qr', qr);

module.exports = router;