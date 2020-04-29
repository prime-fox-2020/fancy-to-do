const jwt = require('jsonwebtoken')
// const secretKey = 'apa aja'
const secretKey = process.env.SECRET_KEY

const generateToken = (user) =>{
    return jwt.sign(
        { id:user.id, email: user.email }, 
         secretKey
    )
}

module.exports = { 
    generateToken
}