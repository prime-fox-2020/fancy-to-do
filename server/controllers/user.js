const {User} = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '296871087286-hmm6icohb03nnd1a7g4jki3o16o15ngj.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

class Controller{

    static findAll(req,res,next){
        User.findAll({})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
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
                }else if (data[i].email == body.email){
                    status=false
                }
            }
            if (status == false){
                throw ({name:'registered',msg: 'email / username used'})
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

    static login(req,res,next){
        const body = req.body
        const username = body.username
        const password = body.password

        User.findOne({where:{username : username}})
        .then(data=>{
            if(!data){
                throw({name:'unregistered',msg: 'incorrect username / password'})
            }
            if(!bcrypt.compareSync(password,data.password)){
                throw({name:'unregistered',msg: 'incorrect username / password'})
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
            console.log(jwt.verify(access_token,secretKey))
            res.status(200).json({access_token})
        })
        .catch(err=>{
            next(err)
        })
    }

    static googleSign(req,res,next){
        const token = req.body.id_token

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        })    
        .then(ticket=>{
            let payload = ticket.getPayload()
            let username = payload.given_name+payload.family_name
            return User.findOne({where:{username:username}})
        })
        .then(user=>{
            if(user){
                throw user
            }else if (!user){
                return client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID,
                })   
            }
        })
        .then(ticket=>{
            console.log('masuk sini')
            let payload = ticket.getPayload()
            let body = {};
            body.first_name = payload.given_name;
            body.last_name = payload.family_name;
            body.email = payload.email;
            body.username = payload.given_name+payload.family_name
            let pass = payload.email.split('').splice(0,5).join('')
            body.password = payload.family_name+pass;
            console.log(body)
            return User.create(body)
        })
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(user=>{
            const username = user.username
            const password = user.password
            User.findOne({where:{username : username}})
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
                next(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
        
    }

    static delete(req,res,next){
        const id = req.params.id
        User.destroy({where: {id : id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getInfo(req,res,next){
        const access_token = req.headers.access_token
        const secretKey= "KeyBoardWarrior"
        const decoded = jwt.verify(access_token,secretKey)

        User.findOne({where:{username : decoded.username}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })

    }



}

module.exports=Controller