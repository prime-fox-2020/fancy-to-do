const router = require('express').Router();
const todoRoutes = require('./todo');
const UserController = require('../controllers/userController');
const PrayerController = require('../controllers/prayerTimes');

router.get('/', (req, res) => {
    res.send('Hi from Router');
})

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use('/todo', todoRoutes);
router.get('/prayer', PrayerController.get);

module.exports = router;
