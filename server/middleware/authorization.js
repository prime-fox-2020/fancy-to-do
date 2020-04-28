const {Project}=require('../models')

const authorization=(req,res,next)=>{
    const {id}=req.params
    const userId=req.userData.id
    Project.findByPk(id)
    .then(project=>{
        if(!project){
            res.status(404).json({message:"Project Not Found"})
        }else if (project.UserId!=userId){
            res.status(403).json({message:"Forbidden Access"})
        }else{
            next()
        }
    })
    .catch(err=>{
        res.status(500).json({message:err.message})
    })
}

module.exports=authorization