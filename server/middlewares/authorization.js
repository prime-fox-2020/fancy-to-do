const {Todo} = require('../models')

const authorization = (req,res,next)=>{
const id = req.params.id
// console.log(req.params)
const userId = Number(req.userData.id)

Todo.findByPk(Number(id))

.then(todo=>{

  if(!todo){
    // res.status(404).json({
    //   error: 'Todo not found'
    // })
    next({name: 'DATA_NOT_FOUND'})
}else if(Number(todo.UserId) !== userId){
  // res.status(403).json({
  //   error: 'Forbidden access'
  // })
  next({name: 'Forbidden access'})
}else{

  next()
}
})
  .catch(err=>{
   
    // res.status(500).json({
    //   err: err
    // })
    next(err)
  })
}

module.exports = authorization