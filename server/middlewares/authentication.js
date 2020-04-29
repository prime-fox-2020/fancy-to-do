const jwt = require('jsonwebtoken')


const authentication = (req, res, next) => {
    const { access_token } = req.headers

    if(!access_token){
        next({ name: 'TokenNotFound' })
    }
    try{
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY)
        req.userData = decoded
        next()
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    authentication
} 