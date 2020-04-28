const jwt = require('jsonwebtoken')
const secretKey = 'ramadhan'


const authentication = (req, res, next) => {
    const { access_token } = req.headers

    if(!access_token){
        res.status(404).json({ message: 'invalid token' })
    }
    try{
        const decoded = jwt.verify(access_token, secretKey)
        req.userData = decoded
        next()
    }
    catch(err){
        res.status(401).json( { message : err.message || 'User not authenticated'})
    }
}

module.exports = {
    authentication
} 