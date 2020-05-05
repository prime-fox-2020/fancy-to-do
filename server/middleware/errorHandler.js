const errorHandler = (err, req, res, params) => {
    let statusCode = 500;
    let errorCode = 'UNKNOWN_ERROR';
    let message = "Something's wrong";

    if (err.name == 'SequelizeValidationError') {
        statusCode = 400;
        errorCode = 'VALIDATION_ERROR';
        message = 'Data harus lengkap';
    } else if (err.name == 'ERROR_NOT_FOUND') {
        statusCode = 404;
        errorCode = 'NOT_FOUND';
        message = 'Data tidak ditemukan';
    } else if (err.name == 'INVALID_EMAIL_PASSWORD') {
        statusCode = 400;
        errorCode = 'INVALID_EMAIL_PASSWORD';
        message = 'Invalid Email / Password';
    } else if (err.name == 'EMAIL_ALREADY_USED') {
        statusCode = 400;
        errorCode = 'EMAIL_ALREADY_USED';
        message = 'Email already used';
    } else if (err.name == 'CITY_NOT_FOUND') {
        statusCode = 404;
        errorCode = 'CITY_NOT_FOUND';
        message = 'City not found';
    } else if (err.name == 'INVALID_TOKEN') {
        statusCode = 401;
        errorCode = 'INVALID_TOKEN';
        message = 'Invalid Token';
    } else if (err.name == 'AUTHENTICATION_FAILED') {
        statusCode = 401;
        errorCode = 'AUTHENTICATION_FAILED';
        message = 'Not authenticated';
    } else if (err.name == "NOT_AUTHORIZATION") {
        statusCode = 401;
        errorCode = "NOT_AUTHORIZATION";
        message = 'Not authorized';
    }
    
    return res.status(statusCode).json({ errorCode, message });
}

module.exports = errorHandler;