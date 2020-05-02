const express = require('express');
const router = express.Router();
const TM = require('../models').Todo;
const TC = require('../controllers/todoController');
const jwt = require('jsonwebtoken');
const secretKey = 'password';

const authentication = (req, res, next) => {
  console.log(req.headers);
  const { access_token } = req.headers;
  // jwt.verify(accessToken, secretKey)

  if (!access_token) {
    next({name: 'DATA_NOT_FOUND'})
  }

  try {
    const decoded = jwt.verify(access_token, secretKey);
    // console.log(decoded);
    req.userData = decoded;
    next();
  }
  catch(err) {
    next(err);
  }
}

const authorization = (req, res, next) => {
  const {id} = req.params;

  console.log(id);
  TM.findByPk(id)
  .then( data => {
      if (!data) {
        next({name: 'DATA_NOT_FOUND'})
      }
      else if (data.UserId === req.userData.id) {
        next()
      }
  })
  .catch(err=> {
    next(err)
  })
}
router.use(authentication)
router.get('/', TC.show);
router.post('/', authorization, TC.add);
router.get('/:id',  TC.findId);
router.put('/:id', authorization, TC.update);
router.delete('/:id', authorization, TC.delete);
router.post('/dailymail/:id', authorization, TC.dailymail);

module.exports = router;
