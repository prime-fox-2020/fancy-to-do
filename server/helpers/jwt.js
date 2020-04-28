const jwt = require('jsonwebtoken')

function generateToken(payload) {
    let token = jwt.sign(payload, 'secret')
    return token

}

module.exports = {
    generateToken
}