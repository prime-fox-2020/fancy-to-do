'use strict'

module.exports = (err, req, res, next) => {
  let statusCode  = 500
  let errorCode   = "UNKNOWN_ERROR"
  let message     = err.message || 'Interval Server Error'

  if(err.name === "SequelizeValidationError") {
    statusCode  = 400
    errorCode   = "VALIDATION_ERROR"
    message     = err.message || "Data harus sesuai dan lengkap"
  }else if(err.name === "SequelizeUniqueConstraintError") {
    statusCode  = 400
    errorCode   = "UNIQUE_CONSTRAINT_ERROR"
    message     = err.message || "Email sudah teregistrasi"
  }else if(err.name === "InvalidEmailOrPassword") {
    statusCode  = 400
    errorCode   = "INVALID_EMAIL_PASSWORD"
    message     = "Invalid Email / Password"
  }else if(err.name === "InvalidParams") {
    statusCode  = 400
    errorCode   = "INVALID_PARAMS"
    message     = "Invalid Params"
  }else if(err.name === "JsonWebTokenError"){
    statusCode  = 401
    errorCode   = "TOKEN_INVALID"
    message     = "token is not valid"
  }else if(err.name === "Unauthorized"){
    statusCode  = 403
    errorCode   = "UNAUTHORIZED"
    message     = "User is not authorized"
  }else if(err.name === 'TokenNotFound'){
    statusCode  = 404
    errorCode   = "TOKEN_NOT_FOUND"
    message     = "token is not found"
  }else if(err.name === "ToDoNotFound"){
    statusCode  = 404
    errorCode   = "TO_DO_NOT_FOUND"
    message     = "To do is not found in this user"
  }else if(err.name === "ItemNotFound"){
    statusCode  = 404
    errorCode   = "TO_DO_NOT_FOUND"
    message     = "To do is not found in this user"
  }else if(err.name === "LocationNotFound"){
    statusCode  = 404
    errorCode   = "LOCATION_NOT_FOUND"
    message     = "Location not found"
  }else if(err.name === "UserNotFound"){
    statusCode  = 404
    errorCode   = "USER_NOT_FOUND"
    message     = "User not found"
  }

  res.status(statusCode).json({ errorCode, message })
}