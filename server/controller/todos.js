const TodoModel = require('../models').Todo
const axios = require("axios")

class Todos{
    static getTodos(req, res, next){
        const dataUserId = req.userData.id
        TodoModel.findAll({
            where: {UserId: dataUserId}
        })
        .then( data=>{
            res.status(200).json({data: data})
        })
        .catch( err=>{
            console.log(err)
            next(err)
            // res.status(500)
        })
    }

    static postTodos(req, res, next){
        TodoModel.create({
            title: req.body.title,
            desc: req.body.desc,
            status: false,
            due_date: req.body.due_date,
            UserId: req.userData.id
        })
        .then( data=>{
            res.status(201).json(data)
        })
        .catch( err=>{
            console.log(err)
            next(err)
            
            // let arr = []
            // for (let a = 0; a < err.errors.length; a++){
            //     arr.push(err.errors[a].message)
            // }
            // if(arr.length > 0){
            //     res.status(400).json({
            //         error: arr.join(',')
            //     })
            // } else {
            //     res.status(500).json({
            //         error: err
            //     })
            // }
        })
    }

    static getTodosId(req, res, next){
        TodoModel.findByPk(Number(req.params.id))
        .then( data=>{
            console.log(data)
            if(data){
                res.status(200).json({
                    data
                })
            } else {
                next({name: 'DATA_NOT_FOUND'})
            }
        })
        .catch( err=>{
            next(err)
        })
    }

    static todosUp(req, res, next){
        TodoModel.update({
            title: req.body.title,
            desc: req.body.desc,
            status: req.body.status,
            due_date: req.body.due_date
        },{
            where: {id: req.params.id}
        })
        .then( data=>{
            if(data == 1){
                res.status(200).json('Data updated')
            } else {
                next({name: DATA_NOT_FOUND})
            }
        })
        .catch( err=>{
            next(err)

            // let arr = []
            // for (let a = 0; a < err.errors.length; a++){
            //     arr.push(err.errors[a].message)
            // }
            // if(arr.length > 0){
            //     res.status(400).json({
            //         error: arr.join(',')
            //     })
            // } else {
            //     res.status(500).json({
            //         error: err
            //     })
            // }
        })
    }

    static todosDel(req, res, next){
        TodoModel.destroy({
            where: {id: req.params.id}
        })
        .then( data=>{
            if(data == 1){
                res.status(200).json('Data deleted')
            } else {
                next({name: 'DATA_NOT_FOUND'})
            }
        })
        .catch( err=>{
            next(err)
            // res.status(404).json(err)
        })
    }

    static remindMe(req, res, next){
        TodoModel.findByPk(Number(req.params.id))
        .then(data=>{
            const message = `Your due date for task '${data.title}' is ${data.due_date}`
            return axios({
                "method":"POST",
                "url":"https://simplemailsender.p.rapidapi.com/SendMails/Send",
                "headers":{
                "x-rapidapi-host":"simplemailsender.p.rapidapi.com",
                "x-rapidapi-key":"78cfb33dcbmsh7404f7edb93e6c2p199944jsn7115cac25fab"
                },"data":{
                Correo_Delivery: req.userData.email,
                Mensjae: message
                }
            })
        })
        .then( response=>{
            res.status(200).json('mail sent')
        })
        .catch( err=>{
            console.log(err, 'njayyy')
            next(err)
        })
    }
}

module.exports = Todos