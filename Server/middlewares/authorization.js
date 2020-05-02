const { Todolist } = require('../models');

function authorization(req, res, next) {
  const { id } = req.userData;

  Todolist.findOne({where: {id: req.params.id}})
  .then(data => {
    if (!data) {
      next({name: 'NotFound'});
    } else if (data.UserId != id) {
      next({name: 'Forbidden'});
    } else {
      next();
    }
  })
  .catch(err => {
    res.status(500).json({message: err.message});
  })
}

module.exports = authorization;