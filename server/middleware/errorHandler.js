const errorHandler=(err,req,res,next)=>{
    let statusCode=500
    let errorCode="UNKNOWN_ERROR"
    let message="Internal Server Error"
    console.log(err)
    switch(err.name){
        case "SequelizeValidationError":
            statusCode=400
            errorCode="VALIDATION_ERROR"
            const error = []
            for(let i = 0; i < err.errors.length; i++){
                error.push(err.errors[i].message)
            }
            message=error.join(', ')
            break
        case "DATA_NOT_FOUND":
            statusCode=404
            errorCode="DATA_NOT_FOUND"
            message="Data not found"
            break
        case "FORBIDDEN_ACCESS":
            statusCode=403
            errorCode="FORBIDDEN_ACCESS"
            message="Forbidden Access"
            break
        case "JsonWebTokenError":
            statusCode=401
            errorCode="TOKEN_ERROR"
            message="invalid token"
            break
        case "TOKEN_NOT_FOUND":
            statusCode=404
            errorCode="TOKEN_NOT_FOUND"
            message="token not found"
            break
        case "INVALID_ID":
            statusCode=404
            errorCode="INVALID_ID"
            message="Invalid Email/Password"
            break
        case "NEED_ARGUMENT":
            statusCode=400
            errorCode="NEED_ARGUMENT"
            message="data and salt arguments required"
            break
    }
    res.status(statusCode).json({errorCode,message})
}

module.exports=errorHandler