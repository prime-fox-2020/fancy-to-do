const { Project } = require('../models')
const { Project_User } = require('../models')
const { TodoProject } = require('../models')

class ProjectController{
    static create(req, res, next){
        const {name, due_date} = req.body
        let sentData
        Project.create({
            name: name,
            due_date: due_date
        })
        .then( data => {
            sentData = data
            return Project_User.create({
                ProjectId: data.id,
                UserId: req.userData.id,
            })
        })
        .then( () => {
            res.status(201).json(sentData)
        })
        .catch( err => {
            next(err)
        })
    }

    static page(req, res, next){
        Project.findAll()
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static findOne(req, res, next){
        Project.findByPk(req.params.id, { include : { model: TodoProject }})
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next({name: 'ERROR_NOT_FOUND'})
        })
    }

    static addTodo(req, res, next){
        Project_User.findAll({ where: { ProjectId : req.params.id} })
        .then( data => {
            let flag = false
            for(let i = 0 ; i < data.length; i++){
                if(data[i].UserId == req.userData.id){
                    flag = true
                    break
                }
            }
            if(flag){
                return TodoProject.create({
                    title: req.body.title,
                    status: false,
                    ProjectId: Number(req.params.id)
                })
            } else {
                next({name: 'NOT_A_MEMBER'})
                return
            }
        })
        .then( data2 => {
            res.status(200).json(data2)
        } )
        .catch( err => {
            next(err)
        })
    }

    static deleteProjectTodo(req, res, next){
        Project_User.findAll({ where: { ProjectId : req.params.id} })
        .then( data => {
            let flag = false
            for(let i = 0 ; i < data.length; i++){
                if(data[i].UserId == req.userData.id){
                    flag = true
                    break
                }
            }
            if(flag){
                return TodoProject.destroy({ where: { id : req.body.id }})
            } else {
                next({name: 'NOT_A_MEMBER'})
                return
            }
        })
        .then( () => {
        } )
        .catch( err => {
            next(err)
        })
    }
}

module.exports = ProjectController