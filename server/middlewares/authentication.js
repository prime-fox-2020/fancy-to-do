const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

function authentication(req, res, next) {
    let token = req.headers.token
    
    try {
        let decoded = verifyToken(token)
        let id = decoded.id
        User.findByPk(id)
        .then(data => {
            if (data) {
                req.userDataId = id
                next()
            } else {
                res.status(401).json({
                    message: "Tolong login dulu",
                    errors: err.message
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                errors: err.message
            })
        })
    } catch (err) {
        res.status(500).json({
            message: "internal server error",
            errors: err.message
        })
    }
}

module.exports = authentication