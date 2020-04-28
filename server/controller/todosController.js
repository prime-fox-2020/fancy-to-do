const {Project}=require('../models')

class TodosController {

    static show(req,res,next){
        const dataUserId=req.userData.id
        Project.findAll({
            where:{
                UserId:dataUserId
            }
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
            // res.status(500).json({errors:err.message})
        })
    }
    
    static addProject(req,res,next){
        const dataUserId=req.userData.id
        Project.create({
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:new Date(req.body.due_date),
            UserId:dataUserId
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            // if(err.name=="SequelizeValidationError"){
            //     // next(err)
            //     // const error = []
            //     // for(let i = 0; i < err.errors.length; i++){
            //     //     error.push(err.errors[i].message)
            //     // }
            //     // res.status(404).json({errors:error.join(', ')})
            // }else{
            //     res.status(500).json({errors:err.message})
            // }
            next(err)
        })
    }

    static updateProject(req,res,next){
        Project.update({
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:new Date(req.body.due_date)
        },{
            where:{
                id:Number(req.params.id)
            }
        })
        .then(data=>{
            Project.findOne({
                where:{
                    id:Number(req.params.id)
                }
            })
            .then(result=>{
                if(result==null){
                    next({name:"DATA_NOT_FOUND"})
                }else{
                    res.status(200).json(result)
                }
            })
            .catch(err=>{
                // if(err.name=="SequelizeValidationError"){
                //     const error = []
                //     for(let i = 0; i < err.errors.length; i++){
                //         error.push(err.errors[i].message)
                //     }
                //     res.status(404).json({errors:error.join(', ')})
                // }else{
                //     res.status(500).json({errors:err.message})
                // }
                next(err)
            })
        })
        .catch(err=>{
            // if(err.name=="SequelizeValidationError"){
            //     const error = []
            //     for(let i = 0; i < err.errors.length; i++){
            //         error.push(err.errors[i].message)
            //     }
            //     res.status(404).json({errors:error.join(', ')})
            // }else{
            //     res.status(500).json({errors:err.message})
            // }
            next(err)
        })
    }

    static search(req,res,next){
        Project.findOne({
            where:{
                id:Number(req.params.id)
            }
        })
        .then(data=>{
            if(data==null){
                next({name:"DATA_NOT_FOUND"})
            }else{
                res.status(200).json(data)
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static delete(req,res,next){
        Project.findOne({
            where:{
                id:Number(req.params.id)
            }
        })
        .then(data=>{
            const target=data
            if(data==null){
                next({name:"DATA_NOT_FOUND"})
                // res.status(404).json({error:"Error Not Found"})
            }else{
                Project.destroy({
                    where:{
                        id:Number(req.params.id)
                    }
                })
                .then(()=>{
                    res.status(200).json(target)
                })
                .catch(err=>{
                    next(err)
                    // res.status(500).json({errors:err.message})
                })
            }     
        })
        .catch(err=>{
            next(err)
            // res.status(500).json({errors:err.message})
        })
    }
}

module.exports=TodosController