const TodoModel = require('../models').Todo

class Todos{
    static getTodos(req, res, next){
        const dataUserId = req.userData.id
        TodoModel.findAll({
            where: {UserId: dataUserId}
        })
        .then( data=>{
            res.status(200).json(data)
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
            if(data == 1){
                res.status(200).json({
                    todo: data
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

}

module.exports = Todos