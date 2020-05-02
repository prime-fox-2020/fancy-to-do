const { Todo } = require('../models')
const axios = require("axios");


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
            const msg = `You have a new todo, ${data.title}. Your due date is ${data.due_date}`
            axios({
                    "method":"POST",
                    "url":"https://simplemailsender.p.rapidapi.com/SendMails/Send",
                    "headers":{
                    "x-rapidapi-host":"simplemailsender.p.rapidapi.com",
                    "x-rapidapi-key":"6a2493f933msh89af1ce3ec969a8p1631adjsn0163c62e9286"
                },"data":{
                    Correo_Delivery: req.userData.email,
                    Mensjae: msg
                }
            })
            .then((response)=>{
                console.log('Mail Sent')
            })
            .catch((err)=>{
                next({name: 'Internal Server Error'})
            })
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
                next({name: 'SequelizeValidationError'})
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