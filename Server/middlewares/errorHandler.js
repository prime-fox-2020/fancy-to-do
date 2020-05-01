module.exports = (err, req ,res , next) => {
    let statusCode = 500;
    let errorCode = 'Internal Server Error';
    let message;

    if(err.name == 'SequelizeValidationError'){
        let messageValidation = []
        for (let i = 0; i < err.errors.length; i++) {
                    messageValidation.push(err.errors[i].message)
                }
        statusCode = 400
        errorCode = 'VALIDATION_ERROR'
        message = messageValidation
    }else if(err.name == 'DATA_NOT_FOUND'){
        statusCode = 404
        errorCode = 'DATA_NOT_FOUND'
        message = 'Data tidak ditemukan'
    }else if(err.name == 'SequelizeUniqueConstraintError'){
        statusCode = 400
        errorCode = 'VALIDATION_ERROR'
        message = 'Email address already in use!'
    }else if(err.name == 'Invalid username / password'){
        statusCode = 400
        errorCode = 'INVALID_USERNAME_OR_PASSWORD'
        message = 'Invalid username / password'
    }else if(err.name == 'Request failed with status code 400'){
        statusCode = 400
        errorCode = 'BAD_REQUEST'
        message = 'Query is empty'
    }else if(err.name == 'Request failed with status code 401'){
        statusCode = 401
        errorCode = 'ACCESS_KEY_NOT_FOUND'
        message = 'Access key not found'
    }else if(err.name == 'Request failed with status code 404'){
        statusCode = 404
        errorCode = 'LOCATION_NOT_FOUND'
        message = 'Location not found'
    }else if(err.name == 'token not found'){
        statusCode = 404
        errorCode = 'TOKEN_NOT_FOUND'
        message = 'Token not found'
    }else if(err.name == "jwt malformed" || err.name == "user not authenticated"){
        statusCode = 401
        errorCode = 'USER_NOT_AUTHENTICATED'
        message = 'User not authenticated'
    }else if(err.name == 'Todo-list not found'){
        statusCode = 404
        errorCode = 'TODO-LIST_NOT_FOUND'
        message = 'Todo-list not found'
    }else if(err.name == 'Forbidden access'){
        statusCode = 403
        errorCode = 'FORBIDDEN_ACCESS'
        message = 'Forbidden Access'
    }

    res.status(statusCode).json({errorCode, message})
}