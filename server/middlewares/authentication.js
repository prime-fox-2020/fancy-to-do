const {User} = require('../models')
const {verify} = require('../helpers/jwt')

const authentication = (req, res, next) => {
    const { access_token } = req.headers

    if(!access_token){
        next({ name: 'TokenNotFound' })
    }
    try{
        let decoded = verify(access_token)
        req.userData = decoded
        let {id} = decoded
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
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    authentication
} 