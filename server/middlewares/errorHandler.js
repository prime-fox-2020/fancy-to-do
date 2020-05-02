module.exports = function(err,request,respond,next){
    console.log('-----------FINDING ERROR-------------')
    let statusCode = 500
    let errorMessage = "Unknown Error"

    if(err.name == 'SequelizeValidationError'){
        statusCode = 400
        errorMessage = "Validation Error"

    } else if(err.name == 'Object Not Found'){
        statusCode = 404
        errorMessage = 'Data not Found'
    }else if(err.name == 'Access Token Not Found'){
        statusCode = 404
        errorMessage = 'Token not Found'
    } else if(err.name =='Authentication Failed'){
        statusCode = 401
        errorMessage = 'Authentication Failed'
    }
    respond.status(statusCode).json({errorMessage})
}