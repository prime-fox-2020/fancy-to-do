require('dotenv').config();
const jwt = require('jsonwebtoken')
// const secretKey = 'apa aja'
const secretKey = process.env.SECRET_KEY

const authentication = (req,res,next) => {
    const { access_token } = req.headers
    // console.log(access_token)

    if(!access_token){
        next({ name: 'token not found'})
    }
    try{
        const decoded = jwt.verify(access_token, secretKey)
        req.userData = decoded
        next()
    } catch(err){
        next({ name : err.message})

    }
}


module.exports = authentication