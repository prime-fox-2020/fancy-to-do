const express = require('express');
const router = express.Router();
const UC = require('../controllers/userController');

router.post('/register', UC.register);
router.post('/login', UC.login);
router.post('/googlelogin', UC.googleLogin);

module.exports = router;
