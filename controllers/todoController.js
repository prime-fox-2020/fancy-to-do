const {Todo} = require('../models');

class todoController {
    static findAll(req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({errMessage: err});
        })
    }

    static findByPk(req, res) {
        Todo.findByPk(req.params.id)
        .then(data => {
            if(data) res.status(200).json(data);
            else res.status(404).json({errMessage: `Data with id ${req.params.id} not found`});
        })
        .catch(err => {
            res.status(500).json({errMessage: err});
        })
    }

    static addData(req, res) {
        const {title, description, status, due_date} = req.body;
        const input = {
            title, description, status, due_date
        }

        Todo.create(input)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            let errMessage = [];
            for(let i in err.errors) {
                errMessage.push(err.errors[i].message);
            }
            res.status(400).json({errMessage});
        })
    }

    static putData(req, res) {
        const {title, description, status, due_date} = req.body;
        const input = {
            title, description, status, due_date
        }
        const id = req.params.id;

        Todo.update(input, {where: {id}})
        .then(data => {
            if (data[0] == 0) res.status(404).json({errMessage: `Data with id ${id} not found`});
            else return Todo.findByPk(id)
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            let errMessage = [];
            for(let i in err.errors) {
                errMessage.push(err.errors[i].message);
            }
            res.status(400).json({errMessage});
        })
    }

    static delete(req, res) {
        const id = req.params.id;
        let record = null;
        Todo.findByPk(id)
        .then(data => {
            if(!data) res.status(404).json({errMessage: `Data with id ${id} not found`});
            else {
                record = data;
                return Todo.destroy({where: {id}})
            }
        })
        .then(data => {
            res.status(200).json(record);
        })
        .catch(err => {
            res.status(500).json({errMessage: err});
        })
    }
}

module.exports = todoController;