const {Project}=require('../models')

class TodosController {

    static show(req,res){
        Project.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({errors:err.message})
        })
    }
    
    static addProject(req,res){
        Project.create({
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:new Date(req.body.due_date)
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            if(err.name=="SequelizeValidationError"){
                const error = []
                for(let i = 0; i < err.errors.length; i++){
                    error.push(err.errors[i].message)
                }
                res.status(404).json({errors:error.join(', ')})
            }else{
                res.status(500).json({errors:err.message})
            }
        })
    }

    static updateProject(req,res){
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
                    res.status(404).json({error:"Error Not Found"})
                }else{
                    res.status(200).json(result)
                }
            })
            .catch(err=>{
                if(err.name=="SequelizeValidationError"){
                    const error = []
                    for(let i = 0; i < err.errors.length; i++){
                        error.push(err.errors[i].message)
                    }
                    res.status(404).json({errors:error.join(', ')})
                }else{
                    res.status(500).json({errors:err.message})
                }
            })
        })
        .catch(err=>{
            if(err.name=="SequelizeValidationError"){
                const error = []
                for(let i = 0; i < err.errors.length; i++){
                    error.push(err.errors[i].message)
                }
                res.status(404).json({errors:error.join(', ')})
            }else{
                res.status(500).json({errors:err.message})
            }
        })
    }

    static search(req,res){
        Project.findOne({
            where:{
                id:Number(req.params.id)
            }
        })
        .then(data=>{
            if(data==null){
                res.status(404).json({error:"Error Not Found"})
            }else{
                res.status(200).json(data)
            }
        })
        .catch(err=>{
            res.status(500).json({errors:err.message})
        })
    }

    static delete(req,res){
        Project.findOne({
            where:{
                id:Number(req.params.id)
            }
        })
        .then(data=>{
            const target=data
            if(data==null){
                res.status(404).json({error:"Error Not Found"})
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
                    res.status(500).json({errors:err.message})
                })
            }     
        })
        .catch(err=>{
            res.status(500).json({errors:err.message})
        })
    }
}

module.exports=TodosController