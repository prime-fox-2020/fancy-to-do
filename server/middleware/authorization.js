const { Todo } = require('../models');

const authorization = (req, res, next) => {
    const { id } = req.params;
    const userId = req.userData.id;
    Todo.findByPk(id)
        .then(todo => {
            if (!todo) {
                next({ name: "NOT_FOUND" })
            } else if (todo.UserId !== userId) {
                next({ name: "NOT_AUTHORIZATION" })
            } else {
                next()
            }
        })
        .catch(err => {
            next({ message: err.message || 'UNKNOWN_ERROR' })
        })
}

module.exports = {
    authorization
};