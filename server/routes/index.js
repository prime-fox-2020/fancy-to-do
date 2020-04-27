const router = require('express').Router();

const todoRoutes = require('./todo');

router.get('/', (req, res) => {
    res.send('Hi from Router');
})

router.use('/todo', todoRoutes);

module.exports = router;
