module.exports = function(err, req, res, next) {
  let statusCode = 500
  let errorCode = 'INTERNAL SERVER ERROR'
  let message = 'Internal Server Error'

  if(err.name == 'SequelizeValidationError') {
    statusCode = 400
    errorCode = 'VALIDATION_ERROR'
    const msg =[]
    for(let i = 0 ; i < err.errors.length; i++) {
      msg.push(err.errors[i].message)
    }
    message = msg.join(', ')
  } else if(err.name == 'EMAIL_ALREADY_EXIST') {
    statusCode = 400
    errorCode = 'EMAIL_ALREADY_EXIST'
    message = 'Email Already Exist'
  } else if(err.name == 'INVALID_EMAIL/PASSWORD') {
    statusCode = 400
    errorCode = 'INVALID_EMAIL/PASSWORD'
    message = 'Invalid Email/Password'
  } else if(err.name == 'ERROR_NOT_FOUND') {
    statusCode = 404
    errorCode = 'ERROR_NOT_FOUND'
    message = 'Error Not Found'
  } else if(err.name == 'PLEASE_LOGIN_FIRST') {
    statusCode = 400
    errorCode = 'PLEASE_LOGIN_FIRST'
    message = 'Please Login First'
  } else if(err.name == 'FORBIDDEN_ACCESS') {
    statusCode = 403
    errorCode = 'FORBIDDEN_ACCESS'
    message = 'Forbidden Access'
  }

  res.status(statusCode).json({errorCode, message})
}