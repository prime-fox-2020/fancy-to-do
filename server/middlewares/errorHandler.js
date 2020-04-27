const errorHandler = (err, req, res,  next) => {
    let status = 500
    let errors = []
    if(err.name === 'SequelizeValidationError'){
        err.errors.forEach(error => {
            errors.push({message: error.message})
        })
        status = 400
    } else if(err.message) {
        errors.push({message: err.message})
        if(err.status) {
            status = err.status
        }
    } else {
        errors.push({message: "internal server error"})
    }
    res.status(status).json(errors)
}

module.exports = errorHandler