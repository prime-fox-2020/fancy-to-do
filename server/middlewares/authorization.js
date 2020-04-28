const {Todo} = require('../models')

function authorization(req, res, next) {
    let id = req.params.id

    Todo.findByPk(id)
    .then(data => {
        if (data) {
            if (data.UserId == req.userDataId) {
                next()
            } else {
                res.status(401).json({
                    msg: "unauthorized!"
                })
            }
        } else {
            res.status(400).json({
                msg: "not found"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "internal server error",
            errors: err.message
        })
    })
}

module.exports = authorization