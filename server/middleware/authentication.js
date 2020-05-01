const {verifyToken} = require('../helper/jwt')

function authentication(req,res,next){
    const { access_token } = req.headers

    if(!access_token){
        next({name : `Invalid Token`})
    }
    try{
        const decoded = verifyToken(access_token)
        req.userData = decoded
        next()
    }
    catch(err){
        next({name : err.message || `User not authenticated`})
    }
}

module.exports = {
    authentication
}