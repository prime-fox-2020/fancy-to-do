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
        errorCode = 'ERROR_NOT_FOUND';
        message = 'Data tidak ditemukan';
    } else if (err.name == 'INVALID_EMAIL_PASSWORD') {
        statusCode = 400;
        errorCode = 'INVALID_EMAIL_PASSWORD';
        message = 'Invalid Email / Password';
    } else if (err.name == 'EMAIL_ALREADY_USED') {
        statusCode = 400;
        errorCode = 'IEMAIL_ALREADY_USED';
        message = 'Email already used';
    }

    res.status(statusCode).json({ errorCode, message });
}

module.exports = errorHandler;