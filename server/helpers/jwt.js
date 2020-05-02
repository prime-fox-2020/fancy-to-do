const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET

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
