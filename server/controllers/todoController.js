const { Todo } = require('../models');

class TodoController{
 static findAll(req, res) {
        Todo.findAll()
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(404).json({message: "Not Found"})
        });
    }

    static create(req, res) {
        let newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.create(newData)
        .then((data) => {
            res.status(201).json(data)
        }).catch((err) => {
            res.status(404).json({message: err})
        });
    }

    static findByPk(req, res) {
        Todo.findByPk(req.params.id)
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(404).json(err)
        });
    }

    static update(req, res) {
        let newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(newData, {
            where: { id: req.params.id }
        })
        .then((data) => {
            if (data == 1) {
                res.status(200).json({message: "data updated"})
            } else {
                res.status(404).json({message: "data not found"})
            }
        }).catch((err) => {
            res.status(404).json(err)
        });
    }
    
    static delete(req, res) {
        Todo.destroy(
            { 
                where : { id: req.params.id }
        })
        .then((data) => {
            if (data == 1) {
                res.status(200).json({message: "data deleted"})
            } else {
                res.status(404).json({message: "data not found"})
            }
        }).catch((err) => {
            res.status(404).json(err)
        });
    }
}

module.exports = TodoController;