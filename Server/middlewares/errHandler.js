const errHandler = (err, req, res, next) => {
    let status = 500
    let errors = []
    if(err.name === 'SequelizeValidationError'){
        err.errors.forEach(el => {
            errors.push(el.message)
        });
        status = 400
    } else if(err.message) {
        if(err.status){
            status = err.status
        }
        errors.push({message: err.message})
    } else {
        errors.push({message: "Internal server error"})
    }
    res.status(status).json(errors)
}

module.exports = errHandler