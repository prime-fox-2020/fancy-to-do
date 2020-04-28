const { Todo } = require('../models')


class todoController {
    //hanya user yang sdh login bisa lihat 
    //authentication
    static findAll(request, respond, next) {
        const userId = String(request.userData.id)
        console.log(userId)
        Todo.findAll({
            where: { UserId: userId }
        })
            .then(data => {
                respond.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    //hanya user yang sdh login bisa lihat 
    //authentication
    static findOne(request, respond, next) {
        Todo.findOne({
            where: {
                id: Number(request.params.id),
                UserId: String(request.userData.id)
            }
        })
            .then(data => {
                if (data === null) {
                    next({ name: 'Object Not Found' })
                } else {
                    respond.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }
    //hanya user yg sdh login bisa create
    //authentication
    static postNew(request, respond,next) {
        console.log('posting ...')
        let objTodo = {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            due_date: request.body.due_date,
            UserId: request.userData.id
        }
        Todo.create(objTodo)
            .then(data => {
                if (!data) {
                    next(error)
                } else {
                    respond.status(201).json(data)
                }
            })
            .catch(err => {
                next(err)

            })
    }
    //hanya user yang buat 
    //authentication authorization
    static updateList(request, respond,next) {
        // console.log('-------------------editing-----------------')
        console.log(request.userData.id)
        let objTodo = {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            due_date: request.body.due_date
        }
        Todo.update(objTodo, {
            where: {
                id: Number(request.params.id),
                UserId: request.userData.id
            }
        })
            .then(data => {
                console.log(data)
                if (data == 1) {
                    respond.status(200).json(data)
                } else {
                    next({ name: 'Object Not Found' })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    //hanya user yang buat 
    //authentication authorization
    static deleteList(request, respond,next) {
        Todo.destroy({
            where: {
                id: Number(request.params.id),
                UserId: String(request.userData.id)
            }
        })
            .then(data => {
                if (data === 0) {
                    next({ name: 'Object Not Found' })

                } else {
                    respond.status(200).json(data)
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = todoController