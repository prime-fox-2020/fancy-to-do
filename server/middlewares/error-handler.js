module.exports = function(err, req, res, next) {
    let statusCode = 500;
    let error_code= "UNKNOWN_ERROR";
    console.log(err); 

    if(err.name == 'SequelizeValidationError'){
        status = 400;
        errorCode = "VALIDATION_ERROR";
    }
    res.status(statusCode).json(error_code);
}