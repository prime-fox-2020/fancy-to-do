module.exports = (err, req, res, next) => {
    let statusCode = 500
    let errorMsg = err.name || "Unknown error"

    if (err.name == "SequelizeValidationError") {
        statusCode = 400
        errorMsg = "Validation_Error"
        message = "Data must complete!"
    } else if (err.name == "Not_Found") {
        statusCode = 404
        errorMsg = "Not_Found"
        message = "Todo not found!"
    }
    res.status(statusCode).json(errorMsg)
}