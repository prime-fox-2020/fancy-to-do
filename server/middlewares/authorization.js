const {Todo} = require('../models')

function authorization(req, res, next) {
    let id = req.params.id

    Todo.findByPk(id)
    .then(data => {
        if (data) {
            if (data.UserId == req.userDataId) {
                next()
            } else {
                throw {
                    msg: "Unauthorized",
                    code: 401
                }
            }
        } else {
            throw {
                msg: "Not Found",
                code: 404
            }
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization