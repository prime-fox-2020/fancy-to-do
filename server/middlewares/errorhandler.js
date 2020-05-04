module.exports = function (err, req, res, next) {
    let statusCode = 500
    let errorCode = 'UNKNOWN ERROR'
    
    if (err.name == 'SequelizeValidationError') {
        statusCode = 400
        errorCode = 'VALIDATION ERROR'
        message = 'Data harus lengkap'
    } else if (err.name == 'DATA_NOT_FOUND') {
        statusCode = 404
        errorCode = 'DATA_NOT_FOUND'
    }

    res.status(statusCode).json(errorCode)
}