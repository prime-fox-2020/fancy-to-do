const verifyToken = require('../helpers/verifyToken')
const { User } = require('../models')

const authentication = (req, res, next) => {
    let token = req.headers.acces_token
    // console.log(token)

    try {
        let decoded = verifyToken(token)
        console.log(decoded)
        let { id } = decoded
        User.findByPk(id)
        .then(data => {
            if (data) {
                req.currentUserId = id
                next()
            } else {
                res.status(401).json(err.message)
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports = authentication