function errorHandler (err , req , res , next){
    let statuscode = 500
    let errorCode = "UNKNOWN ERROR"
    let path = ''

    if(err.name=='SequelizeValidationError'){
        statuscode = 400
        errorCode = 'Validation error'
        path = err.errors[0].path
        msg = err.errors[0].message
        res.status(statuscode).json({errorCode,path,msg})
    }else{
        res.status(statuscode).json({err})
    }
    

    // res.status(statuscode).json(`${errorCode} in ${path}, ${msg}`)
    
}

module.exports=errorHandler