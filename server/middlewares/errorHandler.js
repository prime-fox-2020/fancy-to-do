function errorHandler (err, req, res, next) {
    console.log(err);
    if (err.name == 'JsonWebTokenError') {
        res.status(401).json({
            msg: 'Tolong login dulu'
        })
    } else if (err.name == "SequelizeValidationError") {
        for (let i in err.errors) {
            res.status(400).json({
                msg: err.errors[i].message
            })
        } 
    } else {
        res.status(err.code || 500).json({
          err: err.msg
        })
    }    
}

module.exports = errorHandler