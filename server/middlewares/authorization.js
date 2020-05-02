const {Todo} = require('../models');

const authorization = (req, res, next) => {
    Todo.findByPk(req.params.id)
    .then(data => {
        if(!data) next({name: 'DATA_NOT_FOUND'});
        else if(data.UserId !== req.userData.id) next({name: 'AUTHORIZATION_ERROR'});
        else next();
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization;