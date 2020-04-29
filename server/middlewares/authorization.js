const { Todo } = require('../models');

module.exports = (req, res, next) => {
    const { id } = req.params;

    Todo.findByPk(id)
    .then(todo => {
        if (todo && todo.UserId !== req.user.id){
            res.status(403).json({ message: 'Forbidden Access!'});
        } else {
            next();
        }
    })
}