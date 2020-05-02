const {Todo} = require('../models')
const authorization = (request, respond, next) => {
    Todo.findByPk(request.params.id)
        .then(data => {
            if (!data) {
                respond.status(404).json({
                    message: 'Object not Found!'
                })
            } else if (data.UserId !== String(request.userData.id)) {
                respond.status(403).json({
                    message :'Forbidden Access!'
                })
            } else {
                next()
            }
        })
        .catch(err => {
            respond.status(500).json({
                message: 'Internal Server Error!'
            })
        })
}
module.exports = authorization