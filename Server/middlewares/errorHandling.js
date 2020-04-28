function errorHandling(err, req, res, next) {
  let statusCode = 500;
  let errorCode = 'UNKNOWN_ERROR';
  let message = '';
  console.log(err.name);

  if (err.name == 'SequelizeValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = 'Harap kirim data sesuai ketentuan';
  } else if (err.name == 'NotFound') {
    statusCode = 404;
    errorCode = 'NOT_FOUND';
    message = 'Data tidak ditemukan';
  } else if (err.name == 'Forbidden') {
    statusCode = 403;
    errorCode = 'FORBIDDEN';
    message = 'User tidak punya akses';
  }


  res.status(statusCode).json({errorCode, message});
}

module.exports = errorHandling;