const {validationError} = require('../helpers/validationError')

const errorHandler = (err, req, res, params) => {
    let statusCode = 500
    let errorCode = 'UNKNOWN_ERROR'
    let message = ''
    
    if(err.name === 'SequelizeValidationError'){
        statusCode = 400
        errorCode = "VALIDATION_ERROR"
        message = validationError(err)
    } else if(err.name === 'ERROR_NOT_FOUND'){
        statusCode = 404
        errorCode = "ERROR_NOT_FOUND"
        message = "No data matched"
    } else if(err.name === 'EMAIL_ALREADY_USED'){
        statusCode = 400
        errorCode = "EMAIL_ALREADY_USED"
        message = "Email has been already used"
    } else if(err.name === 'INVALID_EMAIL_PASSWORD'){
        statusCode = 400
        errorCode = "INVALID_EMAIL_PASSWORD"
        message = "Email or password is incorrect"
    } else if(err.name === 'ACCESS_DENIED'){
        statusCode = 404
        errorCode = 'ACCESS_DENIED'
        message = 'Invalid token' 
    } else if(err.name === 'AUTHENTICATION_FAILED') {
        statusCode = 401
        errorCode = 'AUTHENTICATION_FAILED' 
        message = 'User not authenticated'
    } else if(err.name === 'FORBIDDEN_ACCESS'){
        statusCode = 403
        errorCode = 'FORBIDDEN_ACCESS'
        message = 'User did not have access' 
    } else if(err.name === 'INVALID_FORMAT_EMAIL'){
        statusCode = 400
        errorCode = 'INVALID_FORMAT_EMAIL'
        message = 'Invalid format email'
    } else if(err.name === 'EMAIL_SUGGESTION'){
        statusCode = 400
        errorCode = 'EMAIL_SUGGESTION'
        message = err.msg
    } else if(err.name === 'EMAIL_NOT_FOUND'){
        statusCode = 400
        errorCode = 'EMAIL_NOT_FOUND'
        message = 'Please use your valid email'
    } else if(err.name === 'NOT_A_MEMBER'){
        statusCode = 400
        errorCode = 'NOT_A_MEMBER'
        message = 'You are not member of this project'
    }
    
    res.status(statusCode).json({errorCode, message})
}

module.exports = errorHandler