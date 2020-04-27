const express = require('express');
const router = express.Router();
const TC = require('../controllers/todoController');

router.post('/', TC.add);
router.get('/', TC.show);
router.get('/:id', TC.findId);
router.put('/:id', TC.update);
router.delete('/:id', TC.delete);

module.exports = router;
