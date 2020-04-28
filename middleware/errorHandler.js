module.exports = function(err, req, res, next){
    let statusCode = 500
    let errorCode = `Internal Server Error`
    let message = ``

    if (err.name == "SequelizeValidationError"){
        statusCode = 400
        errorCode = `VALIDATION_ERROR_BAD_REQUEST`
        // message = `Invalid Entry Data`
        for (let i = 0; i<err.errors.length; i++){
            if (i<err.errors.length-1){
                message += err.errors[i].message + ', '
            } else {
                message += err.errors[i].message
            }
        }
    } 
    else if (err.name == `Data Not Found`){
        statusCode = 404
        errorCode = `DATA_NOT_FOUND`
        message = `Data tidak ditemukan`
    } 
    // else {

    // }

    res.status(statusCode).json({errorCode, message})
}