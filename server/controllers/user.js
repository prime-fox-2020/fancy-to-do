const {User} = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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


    static register(req,res,next){

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
            next(err)
            // res.status(500).json({message:`internal server error ${err}`})
        })
    }

    static login(req,res){
        const body = req.body
        const username = body.username
        const password = body.password

        User.findOne({where:{username : username}})
        .then(data=>{
            if(!data){
                res.status(400).json({message:'user tidak ada / password salah'})
            }
            if(!bcrypt.compareSync(password,data.password)){
                res.status(400).json({message:'user tidak ada / password salah'})
            }
            return data
        })
        .then(data=>{
            const secretKey= "KeyBoardWarrior"
            const access_token = jwt.sign({
                id : data.id, 
                first_name : data.first_name, 
                last_name : data.last_name,
                email : data.email,
                username : data.username
            },secretKey)
            res.status(200).json({access_token})
        })
        .catch(err=>{
            res.status(500).json({message:'internal server error'})
        })
    }

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