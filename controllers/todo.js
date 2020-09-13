const { Todo } = require('../models')
const { getUserData } = require('../helpers/token')
const unirest = require("unirest")

class TodoController {
    static getAll (req, res, next) {
        Todo.findAll({
            where: {
              UserId: getUserData(req.headers.access_token).id
            }
        })
        .then(data => {
            res.status(200).json({
                todos: data
            })
        })
        .catch(next)
    }

    static getById (req, res, next) {
        let { id } = req.params
        Todo.findByPk(id)
        .then(data => {
            if (!data) {
                throw { messages: [`Todos id ${id} is not found`], statusCode: 404 }
            } else {
                res.status(200).json(data)
            }
        })
        .catch(next)
    }

    static delete (req, res, next) {
        let { id } = req.params
        Todo.destroy({
            where : { id: id }
        })
        .then(data => {
            if (!data) {
                throw { messages: [`Todos id ${id} is not found`], statusCode: 404 }
            } else {
                res.status(200).json({ message: `Todos id ${id} has been deleted` })
            }
        })
        .catch(next)
    }

    static create (req, res, next) {
        const UserId = getUserData(req.headers.access_token).id
        let { title, description, status, due_date } = req.body
        Todo.create({
            title: title,
            description: description,
            status: status,
            due_date: due_date,
            UserId: UserId
        })
        .then(data => {
            res.status(201).json({ message: `A todo has been created` })
        })
        .catch(next)
    }

    static edit (req, res, next) {
        let { id } = req.params
        let { title, description, status, due_date } = req.body
        Todo.update({
            title: title,
            description: description,
            status: status,
            due_date: due_date
        },{
            where: {
                id: id
            }
        })
        .then(data => {
            if (!data) {
                throw { messages: [`Todos id ${id} is not found`], statusCode: 404 }
            } else {
                res.status(200).json({ message: `Todo ${id} has been updated` })
            }
        })
        .catch(next)
    }

    static getTrivia (req, res, next) {
        let { id } = req.params
        Todo.findByPk(id)
        .then(data => {
            if (!data) {
                throw { messages: [`Todos id ${id} is not found`], statusCode: 404 }
            } else {
                let req = unirest("GET", `https://numbersapi.p.rapidapi.com/${data.due_date.getMonth()}/${data.due_date.getDate()}/date`)

                req.query({
                    "fragment": "true",
                    "json": "true"
                })
                
                req.headers({
                    "x-rapidapi-host": "numbersapi.p.rapidapi.com",
                    "x-rapidapi-key": "3b5bbd0d7amsh9f01b0341ecb7bcp11b882jsnf81eaa620512"
                })
                
                
                
                req.end(function (result) {
                    if (result.error) {
                        throw { messages: [`3rd party API error`], statusCode: 502 }
                    }
                    console.log(result.body)
                    res.status(200).json(result.body)
                })
            }
        })
        .catch(next)
    }
}

module.exports = TodoController