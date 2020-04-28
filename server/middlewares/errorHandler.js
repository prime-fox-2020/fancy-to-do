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
    }
    
    res.status(statusCode).json({errorCode, message})
}

module.exports = errorHandler