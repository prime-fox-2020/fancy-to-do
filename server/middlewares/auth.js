const jwt = require('jsonwebtoken');
const {Todo} = require('../models');

const authentication = (req, res, next) => {
    const {access_token} = req.headers;
    try {
        const decoded = jwt.verify(access_token, process.env.KEY);
        req.userData = decoded;
        next();
    } catch (err) {next({status: 401, code:"AUTHENTICATION_FAIL"});}
}

const authorization = (req, res, next) => {
    const {id} = req.params;
    const userDataId = req.userData.id;
    Todo.findByPk(id)
    .then(todo => {
        if (!todo)
            next({status: 400, code:"NOT_FOUND"});
        else if (todo.UserId !== userDataId) 
            next({status: 403, code:"FORBIDDEN_ACCESS"});
        else 
            next();
    }).catch(err =>next({status: 500, code:"INTERNAL_SERVER_ERROR"}))
}

module.exports = {authentication, authorization}