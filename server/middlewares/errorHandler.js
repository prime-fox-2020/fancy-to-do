function errorHandler(err,req,res, next){
  let statusCode = 500;
  let errorCode = "UNKNOWN_ERROR"
  let message = 'Error undescribable'
  console.log(err.name, '-----ini error')
 

  if(err.name == 'SequelizeValidationError'){
    statusCode = 400;
    let arr = []
    console.log(err)
    for(var i = 0; i < err.errors.length; i++){
       arr.push(err.errors[i].message)
    }
    console.log(arr)
    errorCode = 'VALIDATION_ERROR';
    message = arr
  }else if(err.name == 'DATA_NOT_FOUND'){
    statusCode = 404  
    errorCode = 'INVALID_ID'
    message = "Data not found"
  }else if(err.name == 'JsonWebTokenError'){
    statusCode = 401
    errorCode = 'USER_NOT_AUTHENTICATED'
    message = "Invalid User"
  }else if(err.name == 'Forbidden access'){
    statusCode = 403
    errorCode = 'FORBIDDEN_ACCESS'
    message = "You are not authorized to access the file"
  }else if(err.name == 'ReferenceError'){
    statusCode = 500 
    errorCode = 'INTERNAL_SERVER_ERROR'
    message = "Reffernce error"
  }else if(err.name == 'Login Error'){
    statusCode = 400
    errorCode = 'VALIDATION_ERROR'
    message = "Invalid Name/Password"
  }

  res.status(statusCode).json({
    error: errorCode, message: message
  })
}

module.exports = errorHandler