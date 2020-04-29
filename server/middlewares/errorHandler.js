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
    }else if (err.name == "DATA_NOT_FOUND"){
        statuscode = 404
        errorCode = 'Invalid_ID'
        msg = 'Data not found'
        res.status(statuscode).json({errCode,msg})
    }
    

    // res.status(statuscode).json(`${errorCode} in ${path}, ${msg}`)
    
}

module.exports=errorHandler