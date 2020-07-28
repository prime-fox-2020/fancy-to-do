module.exports = function (err, req, res, next) {
    let statusCode = 500
    let errorCode = "Internal server error"
    let message = ''

    if (err.name == 'SequelizeValidationError') {
        statusCode = 400
        errorCode = 'VALIDATION_ERROR'
        message = 'Incomplete data or Wrong Input'
    }
    else if (err.name == 'EmailValidationError') {
        statusCode = 401
        errorCode = 'VALIDATION_ERROR'
        message = 'Email invalid'
    }
    else if (err.name == 'LoginValidationError') {
        statusCode = 404
        errorCode = 'VALIDATION_ERROR'
        message = 'Email or Password invalid'
    }
    else if (err.name == 'DATA_NOT_FOUND') {
        statusCode = 404
        errorCode = 'INVALID ID'
        message = 'Data not found'
    }
    else if (err.name == 'UNAUTHORIZED') {
        statusCode = 401
        errorCode = 'UNAUTHORIZED'
        message = 'Invalid email / password!'
    }
    else if (err.response.data.fault.detail.errorCode == 'oauth.v2.InvalidApiKey') {
        statusCode = 401
        errorCode = 'INVALID_API_KEY'
        message = 'Api key is invalid'
    }
    res.status(statusCode).json({errorCode, message})
}