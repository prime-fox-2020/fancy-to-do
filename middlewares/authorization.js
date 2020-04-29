const {Todo} = require('../models');

const authorization = (req, res, next) => {
    Todo.findByPk(req.params.id)
    .then(data => {
        if(!data) res.status(404).json({errMessage: 'Todo not found'});
        else if(data.UserId !== req.userData.id) res.status(403).json({errMessage: 'Unauthorize'});
        else next();
    })
    .catch(err => {
        res.status(500).json({errMessage: err.message});
    })
}

module.exports = authorization;