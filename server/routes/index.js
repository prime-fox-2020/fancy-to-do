const router = require('express').Router();
const todoRoutes = require('./todo');
const UserController = require('../controllers/userController')

router.get('/', (req, res) => {
    res.send('Hi from Router');
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/todo', todoRoutes);

module.exports = router;
