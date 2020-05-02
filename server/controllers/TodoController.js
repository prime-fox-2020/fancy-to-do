const { Todo } = require('../models')

class TodoController {

    static addTodo(req, res){
        console.log('masuk addTodo')
        const idTokenVeryfied = req.userData.id
        console.log(idTokenVeryfied, 'IdTokenVeryfied')
        console.log('===========', req.body)

        // res.status(200).json(req.body)

        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || 'belum berhasil',
            due_date: req.body.due_date,
            UserId: idTokenVeryfied                 // linked wit author
        })
        .then(response => {
            if (response) {
                res.status(201).json(response)
            } else {
                res.status(400).json({ message: 'Bad Request - unable created data todo' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err.message || 'Unknown - Internal Server Error' })
        })
    }

    static showTodo(req, res){
        console.log('masuk showTodo')
        // console.log(req.headers)
        const idTokenVeryfied = req.userData.id
        // console.log(idTokenVeryfied)
        // console.log(req.body, '<<<<<<<<<A')

        Todo.findAll({
            order: ['id'],
            where: { 
                UserId: idTokenVeryfied
            }
        })
        .then(response => {
            // console.log(response)

            res.status(200).json( response )
        })
        .catch( err => {
            res.status(500).json({ message: err.message || 'Unknown - Internal Server Error' })
        })
    }

    static getTodo(req, res){                        // not yet link atoken
        Todo.findByPk(Number(req.params.id))
        .then(response => {
            console.log('===|===|===', response)
            if(response){
                res.status(200).json(response)
            }
            else{
                res.status(400).json({ message: 'Bad Request - unable find data todo' })
            }
        })
        .catch( err => {
            res.status(500).json({ message: err.message || 'Unknown - Internal Server Error' })
        })
    }

    static updateTodo(req, res){                    // 
        console.log('masuk updateTodo')
        // console.log('\n\n\n', req ,'\n\n\n')
        // const idTokenVeryfied = req.userData.id
        // console.log(idTokenVeryfied)

        let todoObj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
            // UserId: idTokenVeryfied                 // already linked addTodo
        }
        Todo.update(todoObj, {
            where: {
                id: req.params.id
            }
        })
        .then( response => {
            // console.log(response)
            if (response == 1) {
                res.status(200).json({ message: "Update selected todo successfully" }) //
                // res.status(200).json(response) //
            } else {
                res.status(400).json({ message: 'Bad Request - unable updated data todo' })
            }
        })
        .catch(err => {
            if (!err.message) {
                res.status(404).json({message: "Update data todo not found"})                 
            } else{
                res.status(500).json({ message: err.message || 'Unknown - Internal Server Error' })
            }
        })
    }

    static deleteTodo(req, res){
        Todo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then( response => {
            if (response > 0) { // response = 1
                res.status(200).json({ message: 'Delete selected todo successfully' })
            } else {
                res.status(404).json({ message: 'Delete data todo not found' })    
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || 'Unknown - Internal Server Error' })
        })
    }

}
module.exports = TodoController;