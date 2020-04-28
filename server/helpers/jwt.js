const jwt = require('jsonwebtoken');
const secretKey = 'encus'

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        secretKey
    )
}

function verifyToken(token) {
    return jwt.verify(token, secretKey)
}

module.exports = {
    generateToken,
    verifyToken
};
