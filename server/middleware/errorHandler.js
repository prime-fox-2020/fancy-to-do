module.exports = function(err, req, res, next){
    let statusCode = 500
    let errorCode = `Internal Server Error`
    let message = err.message || `Internal Server Error`

    if (err.name == "SequelizeValidationError"){
        statusCode = 400
        errorCode = `VALIDATION_ERROR_BAD_REQUEST`
        // message = `Invalid Entry Data`
        for (let i = 0; i<err.errors.length; i++){
            if (i<err.errors.length-1){
                message += err.errors[i].message + ', '
            } else {
                message += err.errors[i].message
            }
        }
    } 
    else if (err.name == `Invalid Token`){
        statusCode = 401
        errorCode = `AUTHENTICATION_FAILED`
        message = `Invalid Token`
    }
    else if (err.name == `Forbidden Access`){
        statusCode = 403
        errorCode = `USER_RESTRICTED_ACCESS`
        message = `Forbidden Access`
    }
    else if (err.name == `Invalid Email/Password`){
        statusCode = 404
        errorCode = `INVALID_EMAIL_OR_PASSWORD`
        message = `Invalid Email/Password`
    }
    else if (err.name == `Data Not Found`){
        statusCode = 404
        errorCode = `DATA_NOT_FOUND`
        message = `Data Not Found`
    } 
    

    res.status(statusCode).json({errorCode, message})
}