# fancy-to-do
Fancy To Do App, using express, jquery, ajax
This is an application to organize your to do list.
This app has :
* RESTful endpoint for Todo List's CRUD operation
* JSON formatted response

&nbsp;
## RESTful endpoints
---
http://localhost:3000/todos
### GET/todos

>get all todos list

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
[
    {
        "id": 1,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due_date>",
        "UserId": "<todo UserId>",
        "createdAt": "2020-04-27T13:07:02.409Z",
        "updatedAt": "2020-04-27T17:00:35.647Z"
    },
    {
        "id": 2,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due_date>",
        "UserId": "<todo UserId>",
        "createdAt": "2020-04-27T13:57:19.641Z",
        "updatedAt": "2020-04-27T13:57:19.641Z"
    }
]
```
_Response (500 - Bad Request)_
```
{
    "error": "<returned error message>"
}
```
---
http://localhost:3000/todos
### POST/todos

>Create new todos list

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
  "UserId": "<UserId to get insert by selected access_token>",
}
```
_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>",
    "UserId": "<posted UserId>",
    "updatedAt": "2020-04-29T09:18:21.016Z",
    "createdAt": "2020-04-29T09:18:21.016Z"
}
```
_Response(400- bad request)_
```
{
    "message": "<returned error message>"
}
```
_Response (500)_
```
{
   "message": "<returned error message>"
}
```
---
http://localhost:3000/todos/:id
### GET/todos/:id

>Get todos list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
    "id": "<todo given id>",
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "UserId": "<todo given UserId>",
    "createdAt": "2020-04-29T09:18:21.016Z",
    "updatedAt": "2020-04-29T09:41:36.971Z"
}
```
_Response (400 - bad request)_
```
{
    "message": "Bad Request - unable find data todo"
}
```
_Response (500)_
```
{
  "error": "<returned error message>"
}
```
---
http://localhost:3000/todos/:id
### PUT/todos/:id

>Update todos list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "status": "<status to get updated later on>",
  "due_date": "<due_date to get updated later on>",
  "UserId": "<UserId to get updated by selected access_token>"
}
```
_Response(200)_
```
{
    "message": "Update selected todo successfully"
}
```
_Response(404 - not found)_
```
{
    "error": "<returned error message>"
}
```
_Response(400 - bad request)_
```
{
  "error": "<returned error message>"
}
```
_Response (500)_
```
{
  "error": "<returned error message>"
}
```
---
http://localhost:3000/todos/:id
### DELETE/todos/:id

>Delete todos list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```
_Response(200)_
```
{
    "message": "Delete selected todo successfully"
}
```
_Response(404 - not found)_
```
{
    "error": "<returned error message>"
}
```
_Response (500)_
```
{
  "error": "<returned error message>"
}
```