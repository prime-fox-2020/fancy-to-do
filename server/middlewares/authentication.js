const jwt = require('jsonwebtoken')                    // authen proced
const secretKey = process.env.SECRET_KEY               // authen proced (took from helper, readable)


const authentication = (req, res, next) => {           // authen proced
    const { access_token } = req.headers

    if(!access_token){
        res.status(404).json({ message: 'access_token not found'})
    }

    try {
        // verify atoken after hashing
        const decoded = jwt.verify(access_token, secretKey) 
        req.userData = decoded
        next()                                         // so postman(user) won't hanging

    } catch (err) {
        res.status(401).json({ message: err.message || 'user not authorized'})
    }

}

module.exports = { authentication };