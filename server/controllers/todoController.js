const { Todo } = require('../models');



class TodoController {
	static create(req, res) {
		const { title, description, due_date, status } = req.body;

		Todo.create({
			title,
			description,
			due_date,
			status
		})
			.then((data) => {
				res.status(201).json({
					todo: data
				});
			})
			.catch((err) => {
				let arr = [];
				for (let i = 0; i < err.errors.length; i++) {
					arr.push(err.errors[i].message);
				}
				if (arr.length > 0) {
					res.status(400).json({
						error: arr.join(',')
					});
				} else {
					res.status(500).json({
						error: err
					});
				}
			});
	}

	static show(req, res) {
		Todo.findAll()
			.then((data) => {
				res.status(200).json({
					Todo: data
				});
			})
			.catch((err) => {
				res.status(400).json({
					error: err
				});
			});
	}

	static findById(req, res) {
		const { id } = req.params;
		Todo.findByPk(id)
			.then((data) => {
				if(data){

					res.status(200).json({
						todo: data
					});
				}else{
					res.status(404).json({
						error: 'not found'
					})
				}
			})
			.catch((err) => {
				res.status(500).json({
					error: err
				});
			});
		
	}

	static update(req, res) {
		const { id } = req.params;
		const { title, description, due_date, status } = req.body;
		Todo.update(
			{
				title: req.body.title,
				description: req.body.description,
				due_date: req.body.due_date,
				status: req.body.status
			},
			{
				where: {
					id: id
				}
			}
		)
			.then((data) => {
				if(data == 1){
             
					res.status(200).json({
						todo: data
					});
				}else{
					res.status(404).json({
						error: 'not found'
					})
				}
			})
			.catch((err) => {
				let arr = [];
				for (let i = 0; i < err.errors.length; i++) {
					arr.push(err.errors[i].message);
				}
				if (arr.length > 0) {
					res.status(400).json({
						error: arr.join(',')
					});
				} else {
					res.status(500).json({
						error: err
					});
				}
			});
	}
	static delete(req, res) {
		const { id } = req.params;
		Todo.destroy({ where: { id } })
			.then((data) => {
				if(data !== 0){
					res.status(200).json({
						todo: data
					});

				}else{
					res.status(404).json({
						error: 'not found'
					})
				}
				
			})
			.catch((err) => {
				res.status(500).json({
					error: err
				});
			});
	}
}

module.exports = TodoController;
