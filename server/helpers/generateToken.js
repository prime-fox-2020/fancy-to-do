require('dotenv').config()
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

const generateToken = (user) => {
    return jwt.sign({ 
        id: user.id, email: user.email 
    },
        secretKey
    )
}

module.exports = {
    generateToken
}