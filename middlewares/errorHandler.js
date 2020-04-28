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
    }

    respond.status(statusCode).json({errorMessage})
}