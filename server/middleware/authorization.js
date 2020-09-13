const {Project}=require('../models')

const authorization=(req,res,next)=>{
    const {id}=req.params
    const userId=req.userData.id
    Project.findByPk(id)
    .then(project=>{
        if(!project){
            next({name:"DATA_NOT_FOUND"})
        }else if (project.UserId!=userId){
            next({name:"FORBIDDEN_ACCESS"})
        }else{
            next()
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports=authorization