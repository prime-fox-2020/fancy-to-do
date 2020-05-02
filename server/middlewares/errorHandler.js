module.exports = function(err, req, res, next){
    let statusCode = 500
    let errorCode = 'UNKNOWN_ERROR'
    let message = 'unknown error'

    if(err.name == 'SequelizeValidationError'){
        statusCode = 400
        errorCode = 'VALIDATION_ERROR'
        message = 'Data tidak lengkap'
    }

    else if(err.name == 'DATA_NOT_FOUND'){
        statusCode = 404
        errorCode = 'DATA_NOT_FOUND'
        message = 'Data tidak ditemukan'
    }

    else if(err.name == 'UNAUTHORIZED'){
        statusCode = 401
        errorCode = 'UNAUTHORIZED'
        message = 'Invalid email or password'
    }

    res.status(statusCode).json({errorCode, message})
}