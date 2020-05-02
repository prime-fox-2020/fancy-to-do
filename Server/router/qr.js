const router = require('express').Router();
const QrController = require('../controllers/qrController');
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.post('/', QrController.showQr);

module.exports = router;