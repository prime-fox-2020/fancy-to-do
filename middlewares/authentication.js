const jwt = require('jsonwebtoken')
const secretKey = "kunci rahasia"

const authentication = (req, res, next) => {
    //console.log(req.headers)

    const { access_token } = req.headers
    if(!access_token) {
        res.status(404).json({message : "token not found"})
    }
    try {
        const decoded = jwt.verify(access_token, secretKey)
        req.userData = decoded
        next()
    } catch(err) {
        res.status(401).json({message : err.message || 'User not authenticate'})
    }
}

module.exports = {
    authentication
}