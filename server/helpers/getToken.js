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


module.exports = {
    generateToken
};
