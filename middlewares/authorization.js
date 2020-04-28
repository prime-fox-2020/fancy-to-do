require('dotenv').config();
const ToDo = require('../models').FancyToDo
// const secretKey = 'apa aja'
const secretKey = process.env.SECRET_KEY

const authorization = (req,res,next) => {
    const { id } = req.params
    // console.log(req.params);
    ToDo.findByPk(id)
    .then(data => {
        // console.log(data);
        if(!data){
            res.status(404).json({ message: 'Todo-list not found'})
        }else if(data.UserId !== req.userData.id){
            // console.log(data);
            // console.log(req.userData.id);
            res.status(403).json({ message: 'Forbidden access'})
        }else{
            next()
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message || 'Internal Server Error'})
    })
}

module.exports = authorization