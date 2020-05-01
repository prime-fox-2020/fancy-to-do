const { Todo } = require('../models')

class Control {
    static create (req, res, next) {
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            UserId: req.userData.id
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findAll (req, res, next) {
        const dataUserId = req.userData.id

        Todo.findAll({
            where: {UserId: dataUserId}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findById (req, res, next) {
        Todo.findByPk(Number(req.params.id))
        .then(data => {
            if (data) {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static update (req, res, next) {
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }, {
            where: {id: req.params.id}
        })
        .then(data => {
            if (data == 1) {
                res.status(201).json(data)
            }
            else {
                res.status(404).json({message: 'id not found'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        Todo.destroy({
            where: {id: req.params.id}
        })
        .then(data => {
            if (data == 1) {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Control