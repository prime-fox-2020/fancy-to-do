# fancy-to-do
Create fancy to do app, using express, jquery, ajax

GET /todos

Request Header
{
    access_token = <your token>
}

Response (200)
{
    "username": "juansanjay",
    "title": "check update 400",
    "description": "check update 1",
    "status": "done",
    "due_date": "30-05-2020"
},
{
    "username": "pacquiao",
    "title": "check update 500",
    "description": "check update 1",
    "status": "done",
    "due_date": "30-04-2020"
}

Response (err)
}
    statuscode = 404
    errorCode = 'Invalid_ID'
    msg = 'Data not found'
    res.status(statuscode).json({errCode,msg})
}

--------------------------------------------------------------------------------------------------------


POST /todos

Request Header
{
     access_token = <your token>
}

Request Body
{
    "username": "juansanjay",
    "title": "check update 400",
    "description": "check update 1",
    "status": "done",
    "due_date": "30-05-2020"
}

Response (200)
{
    "username": "juansanjay",
    "title": "check update 400",
    "description": "check update 1",
    "status": "done",
    "due_date": "30-05-2020"
}

Response (err)
{
    "name":"authentication/authorization error"
    "msg" : un - authorized only for admin or selected user
}

Response (500)
{
  "errorCode":"UNKNOWN_ERROR"
  "msg":"Internal Server Error"
}

Response (400)
{
    "errorCode":"Validation error"
    "path" : "<path data>"
    "msg":"<message data>"
}

Response (404)
{
    "errorCode":"Invalid_id"
    "msg":"Data Not Found"
}


--------------------------------------------------------------------------------------------------------


GET /todos/ :id

Request Header
{
     access_token = <your token>
}

Request Body
{
    "username": "<shown only for admin or selected user>",
    "title": "<shown>",
    "description": "<shown>",
    "status": "<shown>",
    "due_date": "<shown>"
}

Response (200)
{
    "username": "juansanjay",
    "title": "check update 400",
    "description": "check update 1",
    "status": "done",
    "due_date": "30-05-2020"
}

Response (err)
{
    "name":"authentication/authorization error"
    "msg" : un - authorized only for admin or selected user
}

Response (500)
{
  "errorCode":"UNKNOWN_ERROR"
  "msg":"Internal Server Error"
}

Response (400)
{
    "errorCode":"Validation error"
    "path" : "<path data>"
    "msg":"<message data>"
}

Response (404)
{
    "errorCode":"Invalid_id"
    "msg":"Data Not Found"
}

--------------------------------------------------------------------------------------------------------


PUT/todos/:id

Request Header
{
     access_token = <your token>
}

Request Body
{
    "username": "<updated by admin or selected user>",
    "title": "<updated>",
    "description": "<updated>",
    "status": "<updated>",
    "due_date": "<updated>"
}

Response (200)
{
    res.status(200).json({message: `data updated`})
}

Response (err)
{
    "name":"authentication/authorization error"
    "msg" : un - authorized only for admin or selected user
}

Response (500)
{
  "errorCode":"UNKNOWN_ERROR"
  "msg":"Internal Server Error"
}

Response (400)
{
    "errorCode":"Validation error"
    "path" : "<path data>"
    "msg":"<message data>"
}

Response (404)
{
    "errorCode":"Invalid_id"
    "msg":"Data Not Found"
}


--------------------------------------------------------------------------------------------------------

DELETE /Todos/:id

Request Header
{
     access_token = <your token>
}

Request Body
{
}

Response (200)

{
    "username": "<deleted by admin or selected user>",
    "title": "<deleted>",
    "description": "<deleted>",
    "status": "<deleted>",
    "due_date": "<deleted>"
}


Response (err)
{
    "name":"authentication/authorization error"
    "msg" : un - authorized only for admin or selected user
}

Response (500)
{
  "errorCode":"UNKNOWN_ERROR"
  "msg":"Internal Server Error"
}


Response (404)
{
    "errorCode":"Invalid_id"
    "msg":"Data Not Found"
}


--------------------------------------------------------------------------------------------------------

POST /users/register

Request Header
{
     access_token = <your token>
}

Request Body
{
    id : data.id, 
    first_name : data.first_name, 
    last_name : data.last_name,
    email : data.email,
    username : data.username
}

Response (200)
{
    id : 4, 
    first_name : Juan, 
    last_name : Sanjay,
    email : juansanjay@gmail.com,
    username : juansanjay
}


Response (500)
{
  "errorCode":"UNKNOWN_ERROR"
  "msg":"Internal Server Error"
}

Response (400)
{
    "errorCode":"Validation error"
    "path" : "<path data>"
    "msg":"<message data>"
}

Response (404)
{
    "errorCode":"Invalid_id"
    "msg":"Data Not Found"
}

--------------------------------------------------------------------------------------------------------

POST /users/login

Request Body
{
    username : data.username
    password : data.password
}

Response (200)
{
    access_token = <your token>
}

Response (500)
{
  "errorCode":"UNKNOWN_ERROR"
  "msg":"Internal Server Error"
}

Response (400)
{
    "errorCode":"Validation error"
    "path" : "<path data>"
    "msg":"<message data>"
}

Response (404)
{
    "errorCode":"Invalid_id"
    "msg":"Data Not Found"
}