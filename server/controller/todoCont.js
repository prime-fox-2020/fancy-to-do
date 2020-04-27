const { ToDo } = require('../models');

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
        // console.log('newData: ', newData);
        ToDo.create(newData)
            .then((data) => {
                res.status(201).json(data)
            }).catch((err) => {
                let error = []
                if (err.name === "SequelizeValidationError") {
                    //Error dari validasi model
                    err.errors.forEach(el => {
                        error.push(el.message)
                    });
                    res.status(400).json(error)
                } else {
                    //Error server tidak bisa create
                    res.status(500).json({ msg: 'Internal server error' })
                }
            });
    }

    static findByPk(req, res) {
        ToDo.findByPk(req.params.id)
            .then((data) => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ msg: 'todo tidak ditemukan' })
                }
            }).catch((err) => {
                res.status(500).json({ msg: 'internal server error' })
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
                    res.status(200).json({ msg: 'Data successfully updated' })
                } else {
                    res.status(404).json({ msg: 'Data not found' })
                }

            }).catch((err) => {
                let error = []
                if (err.name === "SequelizeValidationError") {
                    //Error dari validasi model
                    err.errors.forEach(el => {
                        error.push(el.message)
                    });
                    res.status(400).json(error)
                } else {
                    //Error server tidak bisa create
                    res.status(500).json({ msg: 'Internal server error' })
                }
            });
    }

    static delete(req, res) {
        ToDo.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                if (data == 1) {
                    res.status(200).json({msg: 'Data successfully deleted'})
                } else {
                    res.status(404).json({msg: 'Data yang ingin di delete tidak di temukan'})
                }
            }).catch((err) => {
                res.status(500).json({msg: 'internal server error'})
            });
    }
}

module.exports = FancyToDo;
