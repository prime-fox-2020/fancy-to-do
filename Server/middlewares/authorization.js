const { Todolist } = require('../models');

function authorization(req, res, next) {
  const { id } = req.userData;

  Todolist.findOne({where: {id: req.params.id}})
  .then(data => {
    if (!data) {
      res.status(404).json({message: 'Not Found'});
    } else if (data.UserId != id) {
      res.status(403).json({message: 'Forbidden'});
    } else {
      next();
    }
  })
  .catch(err => {
    res.status(500).json({message: err.message});
  })
}

module.exports = authorization;