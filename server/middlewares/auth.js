const jwt = require('jsonwebtoken');
const {Todo} = require('../models');

const authentication = (req, res, next) => {
    const {access_token} = req.headers;
    try {
        const decoded = jwt.verify(access_token, process.env.KEY);
        req.userData = decoded;
        next();
    } catch (err) {
        res.status(401).json({message: err.message || "User is not authenticate"})
    }
}

const authorization = (req, res, next) => {
    const {id} = req.params;
    const userDataId = req.userData.id;
    Todo.findByPk(id)
    .then(todo => {
        if (!todo) {
            res.status(404).json({message: "Todo not found"});
        } else if (todo.UserId !== userDataId) {
            res.status(403).json({message: "Forbiden access"});
        } else {
            next();
        }
    })
    .catch(err => res.status(500).json({message: err.message || "internal server error"}))
}

module.exports = {authentication, authorization}