
module.exports = function (err, req, res, next){
    let statusCode  = 500
    let errorCode   = "UNKNOWN_ERROR"
    let message     = err.message || 'Interval Server Error'

    if(err.name === "SequelizeValidationError") {
        statusCode  = 400
        errorCode   = "VALIDATION_ERROR"
        message     = err.message || "Uncomplete Data"
    }else if(err.name === "SequelizeUniqueConstraintError") {
        statusCode  = 400
        errorCode   = "UNIQUE_CONSTRAINT_ERROR"
        message     = err.message || "Email passed"
    }else if(err.name === "InvalidEmailOrPassword") {
        statusCode  = 400
        errorCode   = "INVALID_EMAIL_PASSWORD"
        message     = "Invalid, check: email; password"
    }else if(err.name === "InvalidParams") {
        statusCode  = 400
        errorCode   = "INVALID_PARAMS"
        message     = "Invalid, check params"
    }else if(err.name === "JsonWebTokenError"){
        statusCode  = 401
        errorCode   = "TOKEN_INVALID"
        message     = "Invalid, check access_token"
    }else if(err.name === "Unauthorized"){
        statusCode  = 403
        errorCode   = "UNAUTHORIZED"
        message     = "User is not authorized"
    }else if(err.name === 'TokenNotFound'){
        statusCode  = 404
        errorCode   = "TOKEN_NOT_FOUND"
        message     = "access_token not found"
    }else if(err.name === "ToDoNotFound"){
        statusCode  = 404
        errorCode   = "TO_DO_NOT_FOUND"
        message     = "To do not found"
    }else if(err.name === "ItemNotFound"){
        statusCode  = 404
        errorCode   = "TO_DO_NOT_FOUND"
        message     = "To do is not found"
    }else if(err.name === "UserNotFound"){
        statusCode  = 404
        errorCode   = "USER_NOT_FOUND"
        message     = "User not found"
    }

    res.status(statusCode).json({ errorCode, message })
}