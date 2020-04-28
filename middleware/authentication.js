const {verifyToken} = require('../helper/jwt')

function authentication(req,res,next){
    const { access_token } = req.headers

    if(!access_token){
        res.status(401).json({ message : `Invalid Token`})
    }
    try{
        const decoded = verifyToken(access_token)
        req.userData = decoded
        next()
    }
    catch(err){
        res.status(401).json({ message : err.message || `User not authenticated`})
    }
}

module.exports = {
    authentication
}