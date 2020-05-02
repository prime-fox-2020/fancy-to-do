# Ryz Todo App
Ryz Todo App is an application to list and check your activity. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* Using Express, jQuery, and Ajax

&nbsp;

## RESTful endpoints
### POST /users/register

> Create new user

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

> User login

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<your email>",
    "password": "<your password>"
}
```

_Response (200 - OK)_
```
{
    "access_token": "<get access token>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<user not found>"
}
```

### POST /todos/
> Create Todo

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<input title>",
    "description": "<input description>",
    "status" : "<input status>",
    "due_date" : "<input due_date>"
}
```

_Response (201 - Created)_
```
{
    "id": <your id> || SERIAL, AUTO INCREMENT,
    "title": "<your title>",
    "description": "<your description>",
    "status" : "<your status>",
    "due_date" : "<your due_date>",
    "createdAt": new Date(),
    "updatedAt": new Date()
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Validation Error"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /todos/
> Read Todos

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

_Response (200 - OK)_
```
[
  {
    "id": <your id> || SERIAL, AUTO INCREMENT,
    "title": "<your title>",
    "description": "<your description>",
    "status" : "<your status>",
    "due_date" : "<your due_date>",
    "createdAt": "<your created data date>",
    "updatedAt": "<your last updated data date>"
  }, ...
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### GET /todos/:id
> Read specify todo with id

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

_Request Params_
```
    "id": <your todo id>
```

_Response (200 - OK)_
```
{
    "id": <your id> || SERIAL, AUTO INCREMENT,
    "title": "<your title>",
    "description": "<your description>",
    "status" : "<your status>",
    "due_date" : "<your due_date>",
    "createdAt": <your created data date>,
    "updatedAt": <your last updated data date>
}

```

_Response (404 - Not Found)_
```
{
  "message": "DATA_NOT_FOUND"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

### PUT /todos/:id
> Update Todo attributes with id

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

_Request Params_
```
    "id": <your todo id>
```

_Response (200 - OK)_
```
{
    "id": <your updated id> || SERIAL, AUTO INCREMENT,
    "title": "<your updated title>",
    "description": "<your updated description>",
    "status" : "<your updated status>",
    "due_date" : "<your updated due_date>",
    "createdAt": <your created data date>,
    "updatedAt": <your last updated data date>
}

```

_Response (400 - Bad Request)_
```
{
  "message": "Validation Error"
}
```

_Response (404 - Not Found)_
```
{
  "message": "DATA_NOT_FOUND"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```


### DELETE /todos/:id
> Delete Todos with id

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

_Request Params_
```
    "id": <your todo id>
```

_Response (200 - OK)_
```
{
    "id": <your deleted id> || SERIAL, AUTO INCREMENT,
    "title": "<your deleted title>",
    "description": "<your deleted description>",
    "status" : "<your deleted status>",
    "due_date" : "<your deleted due_date>",
    "createdAt": <your created data date>,
    "updatedAt": <your last updated data date>
}

```

_Response (404 - Not Found)_
```
{
  "message": "DATA_NOT_FOUND"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
