const jwt =require('jsonwebtoken')
const secretKey = "polalala"

const authentication =(req,res,next)=>{
    console.log(req.headers)
    const {access_token}=req.headers

    if(!access_token){
        next({name:"TOKEN_NOT_FOUND"})
    }

    try{
        const decoded = jwt.verify(access_token,secretKey)
        req.userData=decoded
        next()
    }
    catch(err){
        next({name:"JsonWebTokenError"})
    }
}


module.exports=authentication