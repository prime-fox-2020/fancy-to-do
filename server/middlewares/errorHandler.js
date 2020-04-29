function errorHandler(err,req,res, next){
  let statusCode = 500;
  let errorCode = "UNKNOWN_ERROR"
  console.log(err.name, '-----ini error')
 

  if(err.name == 'SequelizeValidationError'){
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = "All datas cannot be empty/Email format invalid/Due_date format has to be YYY-MM-DD"
  }else if(err.name == 'DATA_NOT_FOUND'){
    statusCode = 404  
    errorCode = 'INVALID_ID'
    message = "Data not found"
  }else if(err.name == 'JsonWebTokenError'){
    statusCode = 401
    errorCode = 'User_NOT_AUTHENTICATED'
    message = "Invalid User"
  }else if(err.name == 'Forbidden access'){
    statusCode = 403
    errorCode = 'FORBIDDEN_ACCESS'
    message = "You are not authorized to access the file"
  }else if(err.name == 'ReferenceError'){
    statusCode = 500 
    errorCode = 'INTERNAL_SERVER_ERROR'
    message = "Reffernce error"
  }

  res.status(statusCode).json({
    error: errorCode, message: message
  })
}

module.exports = errorHandler