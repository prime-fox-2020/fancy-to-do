# Fancy Todo
Create fancy to do app, using express, jquery, ajax

My fancy to do App is an application to manage your task. This app has : 
* RESTful endpoint for Todo's CRUD operation
* SPA based, Fast and Responsive
* Google Sign-in
* 3rd party API send user an email when register completed
* JSON formatted response

# URL
```
Client URL : http://localhost:5500
Server URL : http://localhost:3000
```
# USAGE
```
Make sure you have Node.js and npm in your computer and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.

Run `nodemon app.js or npm run dev` to start the server.

Run `live-server --host=localhost` to start the client
```
# RESTful endpoints
<!-- --- -->
### POST /users/login

_Request Body_
```
{
  "email" : "<your email>",
  "password" : "<your password>"
}
```

_Response (200)_
```
{ 
  "id" : "<generated id by system>"
  "email" : "<your email>",
  "password" : "<your password>"
}
```
_Response (400 - Bad Request / 500 - Internal Server Error)_
```
{ "message": "<returned error message>" }
```
---
### POST /users/register

_Request Body_
```
{
  "email" : "<your email>",
  "password" : "<your password>"
}
```

_Response (200)_
```
{ access_token : <your account access token> }
```
_Response (400 - Bad Request / 500 - Internal Server Error)_
```
{ "message": "<returned error message>" }
```
---
### GET /todos

> Get all todos

_Request Header_
```
{ access_token : <your account access token> }
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": 1,
  "name": "<todos name>",
  "description": "<todos description>",
  "status": "<todos status>",
  "due_date": "<todos due_date>"
}
```
_Response (400 - Bad Request / 401 - Not Authenticated / 500 - Internal Server Error)_
```
{ "message": "<returned error message>" }
```
---
### GET /todos/:id

> Get todos with specific id

_Request Params_
```
Todo's ID
```
_Request Header_
```
{ access_token : <your account access token> }
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <todos id by request>,
  "name": "<todos name>",
  "description": "<todos description>",
  "status": "<todos status>",
  "due_date": "<todos due_date>"
}
```

_Response (400 - Bad Request / 401 - Not Authenticated / 403 - Forbidden Access / 404 - Not Found / 500 - Internal Server Error)_
```
{ "message": "<returned error message>" }
```
---
### POST /todos

> Create new todos

_Request Header_
```
{ access_token : <your account access token> }
```

_Request Body_
```
{
  "name": "<name to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>"
}
```
_Response (400 - Bad Request / 401 - Not Authenticated / 500 - Internal Server Error)_
```
{ "message": "<returned error message>" }
```
### PUT /todos/:id

> Update todos with specific id

_Request Header_
```
{ access_token : <your account access token> }
```

_Request Body_
```
{
  "id": 1,
  "name": "<todos previous name>",
  "description": "<todos previous description>",
  "status": "<todos previous status>",
  "due_date": "<todos previous due_date>"
}
```

_Response (200)_
```
{
  "id": 1,
  "name": "<todos updated name>",
  "description": "<todos updated description>",
  "status": "<todos updated status>",
  "due_date": "<todos updated due_date>"
}
```

_Response (400 - Bad Request / 401 - Not Authenticated / 403 - Forbidden Access / 404 - Not Found / 500 - Internal Server Error)_
```
{ "message": "<returned error message>" }
```
---
### DELETE /todos/:id

> Delete todos with specific id

_Request Header_
```
{ access_token : <your account access token> }
```

_Request Body_
```
Todo's ID
```

_Response (200)_
```
deleted
```

_Response (400 - Bad Request / 401 - Not Authenticated / 403 - Forbidden Access / 404 - Not Found / 500 - Internal Server Error)_
```
{ "message": "<returned error message>" }
```
---
