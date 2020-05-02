const jwt = require('jsonwebtoken')
const secretKey = "rahasia"

const generateToken = (user)=>{
    return access_token = jwt.sign(
        { id: user.id, email: user.email }
        , secretKey
    )
}
const verifyToken = (token)=>{
    return jwt.verify(token,secretKey)
}

module.exports ={
    generateToken,
    verifyToken
} 