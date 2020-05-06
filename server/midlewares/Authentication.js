const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authentication = (req, res, next) => {
    const { access_token } = req.headers

    try {
        const decoded = jwt.verify(access_token, process.env.secretKey)
        req.userData = decoded
        // findOne({where: email}) mencari apakah user ada di database atau tidak
        next()
    } catch (err) {
        next({name: 'UNAUTHORIZED'})
    }
}

module.exports = { authentication }
