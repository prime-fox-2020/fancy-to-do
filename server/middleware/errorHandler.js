module.exports = (err, req, res, next) => {
    let errStatus = null
    let errCode = null
    let errMessage = null
    switch (err.name) {
        case 'DATA_NOT_FOUND':
            errStatus = 404
            errCode = 'DATA_NOT_FOUND'
            errMessage = 'data tidak ditemukan'
            break;
        case 'EROR_SERVER':
            errStatus = 500
            errCode = 'EROR_SERVER'
            errMessage = 'internal error server '
            break;
        case 'EROR_VALIDATION':
            errStatus = 400
            errCode = 'EROR_VALIDATION'
            errMessage = 'error validasi data'
            break;
        case 'JsonWebTokenError':
            errStatus = 401
            errCode = 'LOGIN_ERROR'
            errMessage = 'error validasi data'
            break;
        default:
            break;
    }
    return res.status(errStatus).json({errCode})
};
