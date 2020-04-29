module.exports = (err, req, res, next) => {
  let statusCode  = 500
  let errorCode   = "UNKNOWN_ERROR"
  let message     = err.message || 'Interval Server Error'

if(err.name === "SequelizeValidationError"){
    statusCode  = 400
    errorCode   = "VALIDATION_ERROR"
    message     = err.message || "Data harus sesuai dan lengkap"
}else if(err.name === "JsonWebTokenError"){
    statusCode  = 401
    errorCode   = "TOKEN_INVALID"
    message     = "Your Token ID is Invalid"
}else if(err.name === "Unauthorized"){
    statusCode  = 403
    errorCode   = "UNAUTHORIZED"
    message     = "You are not Authorized"
}else if(err.name === 'TokenNotFound'){
    statusCode  = 404
    errorCode   = "TOKEN_NOT_FOUND"
    message     = "token is not founded"
}else if(err.name === "ToDoNotFound"){
    statusCode  = 404
    errorCode   = "TO_DO_NOT_FOUND"
    message     = "To do is not founded in this user"
}else if(err.name === "ItemNotFound"){
    statusCode  = 404
    errorCode   = "TO_DO_NOT_FOUND"
    message     = "To do is not founded in this user"
}
          
  res.status(statusCode).json({ errorCode, message })
}