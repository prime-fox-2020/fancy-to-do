const { Todo } = require('../models')
const axios = require('axios')

class TodoController{
    static findAll(req, res, next){
        let UserId = req.currentUserId
        Todo.findAll({
            where: {UserId}
        })
        .then(datas => {
            res.status(200).json(datas)
        })
        .catch(err => {
            next(err)
        })
    }

    static add(req, res, next){
        let UserId = req.currentUserId
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            UserId: UserId
        }
        Todo.create(newTodo)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findByPk(req, res, next){
        let id = req.params.id
        Todo.findByPk(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next){
        let id = req.params.id
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(newTodo, {where: {id : id}})
        .then(data => {
            res.status(200).json({message: `Data with title ${req.body.title} updated!`})
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next){
        let id = req.params.id
        Todo.destroy({
            where : {id: id}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static checkHoliday(req, res, next) {
        const day = new Date().getDate()
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        axios({
            method:"GET",
            url:`https://calendarific.com/api/v2/holidays?&api_key=${process.env.api_key}&country=id&year=${year}`
        }).then(result => {
            const datas = result.data.response.holidays
            let holidays = []
            datas.forEach(el => {
                let datetime = el.date.datetime
                if(datetime.month == month && datetime.day > day){
                    holidays.push({
                        name: el.name,
                        description: el.description,
                        date: el.date.iso,
                        country: el.country.name,
                        type: el.type[0]
                    })
                }

                if(datetime.month >= month){
                    if(datetime.month > month){
                        holidays.push({
                            name: el.name,
                            description: el.description,
                            date: el.date.iso,
                            country: el.country.name,
                            type: el.type[0]
                        })
                    }
                }
            })
            res.status(200).json(holidays)
        }).catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController