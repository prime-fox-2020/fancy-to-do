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
                throw {
                    msg: "Tolong login dulu",
                    code: 401
                }
            }
        })
        .catch(err => {
            throw err
        })
    } catch (err) {
        next(err)
    }
}

module.exports = authentication