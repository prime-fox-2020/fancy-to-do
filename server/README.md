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
            "id": 8,
            "title": "ngelap badan",
            "description": "andukan",
            "status": true,
            "due_date": "2020-01-06",
            "createdAt": "2020-04-27T10:04:46.363Z",
            "updatedAt": "2020-04-27T10:04:46.363Z"
        },
        {
            "id": 3,
            "title": "masak rendang",
            "description": "gak di bagi-bagi",
            "status": true,
            "due_date": "2020-02-09",
            "createdAt": "2020-04-27T08:22:50.398Z",
            "updatedAt": "2020-04-27T10:24:23.366Z"
        },
        {
            "id": 2,
            "title": "idup",
            "description": "sans",
            "status": true,
            "due_date": "2020-02-10",
            "createdAt": "2020-04-27T08:21:02.924Z",
            "updatedAt": "2020-04-27T10:26:27.203Z"
        }
    ]
}

_Response (500 - Bad Request)_

{
  "message": "<returned error message>"
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
  "due_date": "<due_date to get insert into>",
   "status": "<status to get insert into>"
}

_Response (201 - Created)_

{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}

_Response(400- bad request)_
{
    "error": "Namanya isi,Deskripsinya isi,Statusnya isi,Due date isi"
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
    "todo": {
        "id": 6,
        "title": "nyapu",
        "description": "nyapu kamar",
        "status": false,
        "due_date": "2020-01-01",
        "createdAt": "2020-04-27T08:35:09.002Z",
        "updatedAt": "2020-04-27T08:35:09.002Z"
    }
}

_Response (404 - not found)_

{
    "error": "not found"
}

_Response (500)_

{
  "error": "<returned error message>"
}

### POST/todos/:id

>Update todos list by ID


_Request Body_

{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "due_date": "<due_date to get updated later on>",
   "status": "<status to get updated later on>"
}

_Response(200)_

{
    "todo": [
        1
    ]
}

_Response(404 - not found)_
{
    "error": "not found"
}


_Response(400- bad request)_
{
    "error": "Namanya isi,Deskripsinya isi,Statusnya isi,Due date isi"
}

_Response (500)_

{
  "error": "<returned error message>"
}


### DELETE/todos/:id

>Delete todos list by ID

_Response(200)_

{
    "todo": 1
}

_Response(404 - not found)_
{
    "error": "not found"
}

_Response (500)_

{
  "error": "<returned error message>"
}

