# fancy-to-do
Create fancy to do app, using express, jquery, ajax

* RESTful endpoint for Todo List's CRUD operation
* JSON formatted response

##Restful endpoints
### GET/todos
>get all todos list

_Request Header_

{
  soon updated
}

_Request Body_

not needed

_Response (200)_

{
    "Todo": [
        {
            "id": 2,
            "title": "Belajar Todos Kedua",
            "description": "lanjut mencoba authentication",
            "status": "berhasil",
            "due_date": "2020-04-27",
            "createdAt": "2020-04-27T13:48:31.410Z",
            "updatedAt": "2020-04-27T13:51:03.672Z"
        },
        {
            "id": 1,
            "title": "Belajar Todos",
            "description": "mencoba restful",
            "status": "berhasil",
            "due_date": "2020-04-27",
            "createdAt": "2020-04-27T13:07:02.409Z",
            "updatedAt": "2020-04-27T13:51:37.106Z"
        },
        {
            "id": 3,
            "title": "Belajar Todos Ketiga",
            "description": "mereview middleware & session",
            "status": "berhasil",
            "due_date": "2020-04-27",
            "createdAt": "2020-04-27T13:57:19.641Z",
            "updatedAt": "2020-04-27T13:57:19.641Z"
        }
    ]
}

_Response (500 - Bad Request)_

{
    "error": {}
}




### POST/todos

>Create new todos list

__Request Header_

{
  soon updated
}

_Request Body_

{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}
{
  "title": "Belajar Todos Keempat",
  "description": "tes delete",
  "status": "berhasil",
  "due_date": "2020-04-27"
}

_Response (201 - Created)_

{
    "Todo": {
        "id": 4,
        "title": "Belajar Todos Keempat",
        "description": "tes delete",
        "status": "berhasil",
        "due_date": "2020-04-27",
        "updatedAt": "2020-04-27T15:38:37.080Z",
        "createdAt": "2020-04-27T15:38:37.080Z"
    }
}

_Response(400- bad request)_
ex: title
{
    "error": "Please do not leave empty title"
}

_Response (500)_

{
  "error": "<returned error message>"
}

### GET/todos/:id

>Get todos list by ID


__Request Header_

{
  soon updated
}

_Request Body_

not needed

_Response (200)_

{
    "Todo": {
        "id": 2,
        "title": "Belajar Todos Kedua",
        "description": "lanjut mencoba authentication",
        "status": "berhasil",
        "due_date": "2020-04-27",
        "createdAt": "2020-04-27T13:48:31.410Z",
        "updatedAt": "2020-04-27T13:51:03.672Z"
    }
}

_Response (404 - not found)_

{
    "error": "data todo not found"
}

_Response (500)_

{
  "error": "<returned error message>"
}

### PUT/todos/:id

>Update todos list by ID


_Request Body_

{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "due_date": "<due_date to get updated later on>",
   "status": "<status to get updated later on>"
}
{
  "title": "Belajar Todos",
  "description": "mencoba restful",
  "due_date": "berhasil",
   "status": "2020-04-27"
}

_Response(200)_

{
    "Todo": "data successfully updated"
}

_Response(404 - not found)_
{
    "error": "data todo not found"
}


_Response(400- bad request)_
ex: description
{
    "error": "Please do not leave empty description"
}

_Response (500)_

{
  "error": "<returned error message>"
}


### DELETE/todos/:id

>Delete todos list by ID

_Response(200)_

{
    "Todo": 1
}

_Response(404 - not found)_
{
    "error": "data todo not found"
}

_Response (500)_

{
  "error": "<returned error message>"
}

