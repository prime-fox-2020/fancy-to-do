const verifyToken = require('../helpers/jwt').verifyToken
const { User } = require('../models')

const authentication = (req, res, next) => {
    let token = req.headers.acces_token
    // console.log(token)

    try {
        let decoded = verifyToken(token)
        let { id } = decoded
        User.findByPk(id)
        .then(data => {
            if (data) {
                req.currentUserId = id
                next()
            } else {
                res.status(404).json(err.message)
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    } catch (err) {
        res.status(403).json({message: '403 - Forbidden Access is denied.'})
    }
}

module.exports = authentication