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
            next({name: 'Todo-list not found'})
        }else if(data.UserId !== req.userData.id){
            // console.log(data);
            // console.log(req.userData.id);
            next({ name: 'Forbidden access'})
        }else{
            next()
        }
    })
    .catch(err => {
        next({ name: err.message})
    })
}

module.exports = authorization