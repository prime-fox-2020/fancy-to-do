const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


function authentication (req, res, next) {
    const { access_token } = req.headers

    try {
        const decoded = jwt.verify(access_token, process.env.secretKey)
        req.userData = decoded
        next()
    } catch (err) {
        next({nam: 'UNAUTHORIZED'})
    }
}

module.exports = authentication
