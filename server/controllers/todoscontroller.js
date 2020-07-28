const {Todo} = require('../models')

class TodosController {
    static show (req, res, next) {
        const dataUserId = req.userData.id
        Todo.findAll({where:{UserId: dataUserId}})
        .then(data => {res.status(200).json(data)})
        .catch(err => {next(err)})
    }

    static showId (req, res, next) {
        Todo.findAll({where: {id: req.params.id}})
        .then(data => {res.status(200).json(data)})
        .catch(err => {next(err)})
    }

    static add (req, res, next) {
        const dataUserId = req.userData.id
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: dataUserId
        }
        Todo.create(obj)
        .then(data => {res.status(201).json(data)})
        .catch(err => {next(err)})
    }

    static update (req, res, next) {
        let id = req.params.id
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(obj, {where: {id: id}})
        .then(data => {
            if(data == 1){res.status(200).json({message: 'data successfully updated'})} 
            else {next({name: 'DATA_NOT_FOUND'})}
        })
        .catch(err => {next(err)})
    }

    static delete (req, res, next) {
        let id = req.params.id
        Todo.destroy({where: {id: id}})
        .then(data => {
            if (data == 1) {res.status(200).json({message: `data successfully deleted`})}
            else {next({name: 'DATA_NOT_FOUND'})}
        })
        .catch(err => {next(err)})
    }
}

module.exports = TodosController