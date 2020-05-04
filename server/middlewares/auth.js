const jwt = require('jsonwebtoken')
const secretKey= "KeyBoardWarrior"
const {Todo} = require('../models/index')


function authentication (req,res,next){
    // console.log(req.headers)
    const access_token = req.headers.access_token
    try{
        const decoded = jwt.verify(access_token,secretKey)
        req.userData = decoded
        next()
    }
    catch(err){Man
        next(err)
    }
}

function authorization (req,res,next){
    const access_token = req.headers.access_token
    const decoded = jwt.verify(access_token,secretKey)
    const usernameCheck = decoded.username.toLowerCase().slice(0,5)
    try{
        if(usernameCheck!=='admin'){
            res.status(501).json('un - authorized only for admin')
        }
        if(usernameCheck=='admin'){
            next()
        }
    }
    catch(err){
        next(err)
    }
}

function authorizationSU(req,res,next){
    const id = req.params.id
    const username = req.userData.username
    
    Todo.findByPk(id)
        .then((data)=>{
            if(username.toLowerCase().slice(0,5) == 'admin'){
                next()
            }
            else if(username !== data.username){
                status = false
                throw ({name:'unauthorized',msg: 'authorized only for admin or user only'})
            }
            else if(username == data.username){
                next()
            }
        })
        .catch(err=>{
            next(err)
        })
}

function authorizationSA(req,res,next){
    const username = req.userData.username
    const bodyUsername = req.body.username

        if(username.toLowerCase().slice(0,5) == 'admin'){
            next()
        }
        else if(username !== bodyUsername){
            status = false
            throw ({name:'unauthorized',msg: 'authorized only for admin or user only'})
        }
        else if(username == bodyUsername){
            next()
        }
    }


module.exports={authentication,authorization,authorizationSU,authorizationSA}