module.exports = function(err, req, res ,next) {
    let statusCode = 500
    let errorCode = "UNKNOW_ERROR"
    let message = ''
    console.log(err);
    

    if(err.name == 'SequelizeValidationError'){
        statusCode = 404
        errorCode = "VALIDATION_ERROR"
        message = "Make sure your input data is complete"
    } else if (err.name == 'DATA_NOT_FOUND'){
        statusCode = 404
        errorCode = "DATA_NOT_FOUND"
        message = "No data matched"
    }
    res.status(statusCode).json({errorCode, message})
}