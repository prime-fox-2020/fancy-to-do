module.exports = (err, req, res, next){
    let statusCode = 500
    let errorMsg = err.name || "Unknown error"
    
    res.status(st).json(errorMsg)
}