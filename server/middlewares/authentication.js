const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.SECRET_KEY


const authentication = (req, res, next) => {
    const { access_token } = req.headers

    if(!access_token){
        next({name: 'ACCESS_DENIED'})
    }
    try{
        const decoded = jwt.verify(access_token, secretKey)
        req.userData = decoded
        next()
    }
    catch(err){
        next({name: 'AUTHENTICATION_FAILED'})
    }
}

module.exports = {
    authentication
}