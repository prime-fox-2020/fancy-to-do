const {ToDo} = require('../models');

class FancyToDo {
    static findAll(req, res) {
        ToDo.findAll()
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(404).json(err)
        });
    }

    static create(req, res) {
        let newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        console.log('newData: ', newData);
        ToDo.create(newData)
        .then((data) => {
            res.status(201).json(data)
        }).catch((err) => {
            res.status(404).json(err)
        });
    }

    static findByPk(req, res) {
        ToDo.findByPk(req.params.id)
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
        ToDo.update(newData, {
            where: {
                id: req.params.id
            }
        })
        .then((data) => {

            if (data == 1) {
                res.status(200).json(data)
            }

        }).catch((err) => {
            res.status(404).json(err)
        });
    }
    
    static delete(req, res) {
        ToDo.destroy({where : {
            id: req.params.id
        }})
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(404).json(err)
        });
    }
}

module.exports = FancyToDo;
