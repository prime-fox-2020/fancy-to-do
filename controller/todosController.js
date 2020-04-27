const {Project}=require('../models')

class TodosController {

    static show(req,res){
        Project.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json(err)
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
            if(err.name="SequelizeValidationError"){
                res.status(404).json(err)
            }else{
                res.status(500).json(err)
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
                    res.status(404).json({error:"Not Found"})
                }else{
                    res.status(200).json(data)
                }
            })
            .catch(err=>{
                if(err.name="SequelizeValidationError"){
                    res.status(404).json(err)
                }else{
                    res.status(500).json(err)
                }
            })
        })
        .catch(err=>{
            if(err.name="SequelizeValidationError"){
                res.status(404).json(err)
            }else{
                res.status(500).json(err)
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
                res.status(404).json({error:"Not Found"})
            }else{
                res.status(200).json(data)
            }
        })
        .catch(err=>{
            res.status(500).json(err)
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
                res.status(404).json({error:"Not Found"})
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
                    res.status(400).json(err)
                })
            }     
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports=TodosController