const errorHandler = (err, req, res, next) => {
    let statusCode = 500
    let errorCode = 'Unknown Error'

    if(err.name === 'SequelizeValidationError') {
        statusCode = 400
        errorCode = 'validation eror'
    } else if (err.name === 'data not found') {
        statusCode = 404
        errorCode = "data not found"
    }

    res.status(statusCode).json({errorCode})
}

module.exports = errorHandler