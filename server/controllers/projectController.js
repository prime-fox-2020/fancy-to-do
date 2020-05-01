const { UserTodo } = require('../models')

class projectController {
    static addProject (req, res, next) {
        const { name, members } = req.body
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
    }
}

module.exports = projectController