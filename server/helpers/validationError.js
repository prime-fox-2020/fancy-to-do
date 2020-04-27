const validationError = (err) =>{
    const validationError = []
    for(let i = 0; i < err.errors.length; i++){
        validationError.push(err.errors[i].message)
    }
    return validationError.join(', ')
}

module.exports = {
    validationError
}