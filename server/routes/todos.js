const route = require('express').Router()
const todo = require('../controllers/todos.js')
const jwt = require('jsonwebtoken')
const secretKey= "KeyBoardWarrior"

/// admin can access allview,add,update
/// req.userData.username can only access his/her data on mytodos,put,delete
/// admin01 token = 
/// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6ImVyemEiLCJsYXN0X25hbWUiOiJzY2FybGV0dCIsImVtYWlsIjoiZXJ6YXNjYXJsZXR0QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4wMSIsImlhdCI6MTU4ODA5NzY3NX0.3xVRS44T9ubvxy1b6P-c8PwkrANQ5tE7urCzV89Buw0 
/// pacquiao token = 
/// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZmlyc3RfbmFtZSI6IlBhYyIsImxhc3RfbmFtZSI6IlF1aWFvIiwiZW1haWwiOiJwYWNxdWlhb0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6InBhY3F1aWFvIiwiaWF0IjoxNTg4MDk2NzU5fQ.8xFxrXLJoSHMTfxULT5oCyeVj7JKgGY7abcbTNe3EbI

function authentication (req,res,next){
    // console.log(req.headers)
    const access_token = req.headers.access_token
    try{
        const decoded = jwt.verify(access_token,secretKey)
        req.userData = decoded
        next()
    }
    catch(err){
        res.status(501).json('un - authenticated')
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
        res.status(501).json('un - authorized only for admin')
    }
}

//get all , admin
route.get('/' , authentication , authorization , todo.findAll)
//get all but only user , user
route.get('/mytodos' , authentication , todo.findAllMyTodos)
//get all targeted id
route.get('/:id' , authentication , authorization , todo.findId)
//post add , admin
route.post('/' , todo.add)
//put delete only admin or User A only can update A , B cannot u A AUTHORIZATION DI CONTROLLERS
route.put('/:id' , authentication , todo.update)
//put delete only admin or User A only can delete A , B cannot delete A AUTHORIZATION DI CONTROLLERS
route.delete('/:id' , authentication , todo.delete)























module.exports=route