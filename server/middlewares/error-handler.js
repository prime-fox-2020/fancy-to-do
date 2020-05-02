module.exports = function(err, req, res, next) {
    let status;
    let code;
    if(!err.status || !err.code) {
        console.log(err);
        status = 500;
        code = "UNKNOWN_ERROR";
    } else {
        if(err.name == 'SequelizeValidationError') {
            status = 400;
            code = "VALIDATION_ERROR";
        }
    }

    res.status(status).json(code);
}