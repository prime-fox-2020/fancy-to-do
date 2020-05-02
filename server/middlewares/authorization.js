const { Todo } = require('../models');

const authorization = (req, res, next) => {
	const id = req.params.id;

	const userId = Number(req.userData.id);

	Todo.findByPk(Number(id))
		.then((todo) => {
			if (!todo) {
				next({ name: 'DATA_NOT_FOUND' });
			} else if (Number(todo.UserId) !== userId) {
				next({ name: 'Forbidden access' })
			} else {
				next()
			}
		})
		.catch((err) => {
			next(err)
		})
};

module.exports = authorization;
