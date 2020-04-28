// const { Todo } = require('../models')                  // author proced
const jwt = require('jsonwebtoken')                    // authen proced
const secretKey = 'rahasia'                            // authen proced (took from helper, readable)


const authentication = (req, res, next) => {           // authen proced
    console.log('initiate authen from middleware')
    const { access_token } = req.headers

    if(!access_token){
        res.status(404).json({ error: 'access_token not found'})
    }

    try {
        // verify atoken after hashing
        const decoded = jwt.verify(access_token, secretKey) 
        req.userData = decoded
        next()                                         // so postman(user) won't hanging

    } catch (err) {
        res.status(401).json({ error: err.message || 'user not authorized'})
    }

}

module.exports = { authentication };