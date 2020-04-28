const errHandler = (err, req, res, next) => {
    let status = 500
    let errors = []
    if(err.name === 'SequelizeValidationError'){
        err.errors.forEach(el => {
            errors.push({message: el.message})
        });
        status = 400
    } else if(err.message) {
        errors.push({message: err.message})
        if(err.status){
            status = err.status
        }
    } else {
        errors.push({message: "Internal server error"})
    }
    res.status(status).json(err.message || errors)
}

module.exports = errHandler