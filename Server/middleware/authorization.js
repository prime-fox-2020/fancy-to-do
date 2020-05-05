const { todo } = require('../models')

const authorization = (req, res, next) => {
    todo.findByPk(req.params.id)
    .then(data =>{
        if(!data){
            res.status(404).json({message: "data not found"})
        } else if(!data.UserId == req.userDataValid.id){
            res.status(403).json({message: "access is forbidden"})
        } else{
            next()
        }
    })
    .catch(err =>{
        res.status(500).json({message: err.message || "Internal server error"})
    })
}

module.exports = {
    authorization
}