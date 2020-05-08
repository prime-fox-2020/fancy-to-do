const { ToDo } = require('../models');

class FancyToDo {
    static findAll(req, res, next) {
        ToDo.findAll({
            order: [['id', 'ASC']],
            where: {
                UserId: req.userId
            }
        })
            .then((data) => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    next({ name: 'DATA_NOT_FOUND' })
                }
            }).catch((err) => {
                next({ name: 'EROR_SERVER' })
            });
    }

    static create(req, res, next) {
        let newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userId
        }
        ToDo.create(newData)
            .then((data) => {
                res.status(201).json(data)
            }).catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    next({ name: 'EROR_VALIDATION' })
                } else {
                    next({ name: 'EROR_SERVER' })
                }
            });
    }

    static findByPk(req, res, next) {
        ToDo.findByPk(req.params.id)
            .then((data) => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    next({ name: 'DATA_NOT_FOUND' })
                }
            }).catch((err) => {
                next({ name: 'EROR_SERVER' })
            });
    }

    static update(req, res, next) {
        let newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userId
        }
        ToDo.update(newData, {
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                if (data == 1) {
                    res.status(200).json({ msg: 'Data successfully updated' })
                } else {
                    next({ name: 'DATA_NOT_FOUND' })
                }

            }).catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    next({ name: 'EROR_VALIDATION' })
                } else {
                    next({ name: 'EROR_SERVER' })
                }
            });
    }

    static delete(req, res, next) {
        ToDo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                if (data == 1) {
                    res.status(200).json({ msg: 'Data successfully deleted' })
                } else {
                    next({ name: 'DATA_NOT_FOUND' })
                }
            }).catch((err) => {
                next({ name: 'EROR_SERVER' })
            });
    }
}

module.exports = FancyToDo;
