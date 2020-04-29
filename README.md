# Ryz Todo App
Ryz Todo App is an application to list and check your activity. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* Using Express, jQuery, and Ajax

&nbsp;

## RESTful endpoints
### POST /users/register

> Get all assets

_Request Header_
```
not needed
```

_Request Body_
```
{ 
    "first_name": "<your first name>",
    "last_name": "<your last name>",
    "email": "<your email>",
    "password": "<your password>"
}
```

_Response (200)_
```
{
    "id": "<your id>",
    "first_name": "<your first name>",
    "last_name": "<your last name>",
    "email": "<your email>",
    "password": "<your password>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<returned error message>"
}
```
---
### POST /users/login

> Create new asset

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "email": "<your email>",
    "password": "<your password>"
}
```

_Response (201 - Created)_
<!-- ```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
``` -->

_Response (400 - Bad Request)_
<!-- ```
{
  "message": "<returned error message>"
}
``` -->

### POST /todos/
### GET /todos/
### GET /todos/:id
### PUT /todos/:id
### DELETE /todos/:id