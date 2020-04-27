const router = require('express').Router();
const todoRouter = require('./todo');
const userRoutes = require('./user');

router.use('/todos', todoRouter);
router.use('/users', userRoutes);

module.exports = router;