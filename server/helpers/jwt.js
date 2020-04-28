var jwt = require('jsonwebtoken')
const secretKey = "polalala"

function generateToken(user){
    return jwt.sign({
        id:user.id,
        email:user.email
    },secretKey) 
}

module.exports=generateToken
             