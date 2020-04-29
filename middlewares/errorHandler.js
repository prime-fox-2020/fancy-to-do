module.exports = function(err, req, res, next) {
    let error_code = 'UNKNOWN_ERROR'
    let status = 500;
    let message = err.message;

    if(err.name == 'SequelizeValidationError') {
        error_code = 'VALIDATION_ERROR';
        status = 400;
        message = err.errors[0].message;
    }
    else if(err.name == 'DATA_NOT_FOUND') {
        error_code = err.name;
        status = 404;
        message = 'Data not found';
    }
    else if(err.name == 'AUTHORIZATION_ERROR') {
        error_code = err.name;
        status = 403;
        message = 'Unauthorize';
    }
    else if(err.name == 'TOKEN_NOT_FOUND') {
        error_code = err.name;
        status = 404;
        message = 'Token Not Found';
    }
    else if(err.name == 'AUTHENTICATION_ERROR') {
        error_code = err.name;
        status = 401;
        message = 'Unauthenticate';
    }
    else if(err.name == 'LOGIN_FAILED') {
        error_code = err.name;
        status = 401;
        message = 'Invalid Username/ Password';
    }
    
    res.status(status).json({error_code, message});
}