const { UserTodo } = require('../models')

class projectController {
    static addProject (req, res, next) {
        const { name, members } = req.body
        members.push({id: req.userId})
        if(name !== 'personal'){
            members.forEach(member => {
                UserTodo.create({
                    UserId: member.id,
                    project: name
                }).then(response => {
                    const obj = {
                        name: response.project,
                        memberId: response.UserId
                    }
                    console.log(obj)
                    res.status(200).json({message:"project created"})
                }).catch(next)
            })
        } else {
            throw { message: `named can't be "personal"`, status: 400 }
        }
    }
    static getProjects(req, res, next) {
        UserTodo.findAll({
            where: { UserId: req.userId}
        }).then(response => {
            res.status(200).json(response)
        }).catch(next)
    }
}

module.exports = projectController