const {Todo} = require('../models')


class todoController{
    static findAll(request,respond){
        Todo.findAll()
        .then(data=>{
            respond.send(200).json(data)
        })
        .catch(err => {
            respond.send.json(err)
        })
    }

    static post(request,respond){
        Todo.create()
    }
}

module.exports = todoController