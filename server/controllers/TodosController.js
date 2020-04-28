const {Todo} = require('../models')

class TodosController{
    static add(req, res, next){
        const { title, description, status, due_date } = req.body
        const  UserId  = req.userData.id
        Todo.create( {title, description, status, due_date, UserId} )
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static read(req, res){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findOne(req, res, next){
        Todo.findOne({where: {id: req.params.id}})
        .then(data => {
            if(data){
                res.status(200).json(data)
            } else {
                next({name: "DATA_NOT_FOUND"})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next){
        const { title, description, status, due_date } = req.body

        Todo.update({ title, description, status, due_date }, {
            where: { id: req.params.id }
        })
        .then(data => {
            if(data){
                res.status(200).json({ title, description, status, due_date })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res){
        let dataObj
        Todo.findOne({where: {id: req.params.id}})
        .then(data => {
            if(data){
                dataObj = data
                return Todo.destroy({
                    where: { id: req.params.id }
                })
            }
        })
        .then( () => {
            res.status(200).json(dataObj)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodosController