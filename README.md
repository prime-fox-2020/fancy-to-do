# fancy-to-do
Create fancy to do app, using express, jquery, ajax

GET /todos
Get all todos list

Request Header

Request Body

not needed
Response(200)

[
    {
        "id": 1,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "2020-04-27T10:15:59.046Z",
        "createdAt": "2020-04-27T10:15:59.051Z",
        "updatedAt": "2020-04-27T10:15:59.051Z"
    },
    {
        "id": 2,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "2020-04-27T10:18:33.613Z",
        "createdAt": "2020-04-27T10:18:33.616Z",
        "updatedAt": "2020-04-27T10:18:33.616Z"
    }
]
Response(500)

{
  message: "ada kesalahan pada server", 
  detail: "<todo err>"
}
POST/todos
Request Header

updated soon
Request Body

{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>"
}
Response(201)

{
    "todo": {
        "id": 1,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "2020-04-27T12:01:48.415Z",
        "updatedAt": "2020-04-27T12:01:48.417Z",
        "createdAt": "2020-04-27T12:01:48.417Z"
    },
    "message": "Todo berhasil dibuat"
}
Response(400)

{
    "error": "validation error",
    "detail": {
        "title": "title cannot be empty",
        "description": "description cannot be empty",
        "status": "status cannot be empty"
    }
}
Response(500)

{
  message: "ada kesalahan pada server", 
  detail: "<todo err>"
}
GET/todos/:id
Request Header

updated soon
Request Params

{ id : "<todo id>" }
Request Body

not needed
Response(200)

{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2020-04-27T10:15:59.046Z",
    "createdAt": "2020-04-27T10:15:59.051Z",
    "updatedAt": "2020-04-27T10:15:59.051Z"
}
Response(404)

{
    "error": "404 not found"
}
PUT/todos/:id
Request Header

updated soon
Request Params

{ id : "<todo id>" }
Request Body

{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>"
}
Response(200)

{
    "message": "sucessfully update data"
}
Response(400)

{
    "error": "validation error",
    "detail": {
        "title": "title cannot be empty",
        "description": "description cannot be empty",
        "status": "status cannot be empty"
    }
}
Response(404)

{error: '404 not found'}
Response(500)

{
  message: "ada kesalahan pada server", 
  detail: "<todo err>"
}
DELETE/todos/:id
Request Header

updated soon
Request Params

{ id : "<todo id>" }
Request Body

not needed
Response(200)

{
  message: 'successfully delete todos'
}
Response(500)

{
  message: "ada kesalahan pada server", 
  detail: "<todo err>"
}