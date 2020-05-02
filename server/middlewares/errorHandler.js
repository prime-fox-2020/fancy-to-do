const AppError = require('../helpers/appError')

const handleValidationErrorDB = (error) => {
  const message = error.errors.map(el => el.message += '.').join(' ')
  return new AppError(message, 400)
}

const handleValidationErrorToken = (error) => {
  const message = 'Email/Password not match'
  return new AppError(message, 401)
}

const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err
  })
}

const sendErrProd = (err, res) => {
  console.log(err)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.errorCode
    })
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something bad happend. It is not our fault. Or maybe it is.'
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'production') {
    let error = {...err}

    if (error.name === 'SequelizeValidationError') error = handleValidationErrorDB(error)
    if (error.name === 'JsonWebTokenError') error = handleValidationErrorToken(error)
    // console.log({error: err})
    sendErrProd(error, res)
  } else if (process.env.NODE_ENV === 'development') {
    sendErrDev(err, res)
  }
}