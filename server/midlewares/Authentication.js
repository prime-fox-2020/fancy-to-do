const jwt = require('jsonwebtoken')
const secretKey = 'sayakurangpahamsecretkey'


function authentication (req, res, next) {
    const { access_token } = req.headers

    try {
        const decoded = jwt.verify(access_token, secretKey)
        req.userData = decoded
        next()
    } catch (err) {
        res.status(401).json({message: err.message || 'User not authenticated'})
    }
}

module.exports = authentication
