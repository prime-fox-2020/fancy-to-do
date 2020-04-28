const {User} = require('../models/index')

class Controller{

    static findAll(req,res){
        User.findAll({})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json('data tidak ada')
        })
    }


    static register(req,res){

    const body = req.body
        body.first_name = body.first_name,
        body.last_name = body.last_name,
        body.email = body.email,
        body.username = body.username,
        body.password = body.password

    let status = true
    User.findAll({})
        .then(data=>{
            for(var i = 0 ; i < data.length ; i ++){
                if(data[i].username == body.username){
                    status=false
                }
            }
            if (status == false){
                res.status(200).json({message:'username sudah ada'})
            }else{
                return User.create(body)
            }
        })

        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json('internal server error')
        })
    }

    static login(req,res){}

    static delete(req,res){
        const id = req.params.id
        User.destroy({where: {id : id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(200).json({message: `data not found`})
        })
    }




}

module.exports=Controller