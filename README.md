# fancy-to-do
Fancy to do App is an application to manage your task and created using express, jquery, ajax and postgre. This app has : 
* RESTful endpoint for todos CRUD operation
* JSON formatted response
* Google Sign In
* 3rd Party API which has information about holiday dates


&nbsp;

## RESTful endpoints

### POST /register

> Register with your email and password

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email" : "<user_email>",
  "password" : "<user_password>"
}
```

_Response (200)_
```
{
    "id": <user_id>,
    "email": "<user_email>",
    "password": "<user_password>"
}
```

_Response (400 - Validation Error)_
```
{
  "message": "Wrong Email format || Password is required"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

### POST /login

> Login with your account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email" : "<user_email>",
  "password" : "<user_password>"
}
```

_Response (200)_
```
{
  "access_token": "<user_access_token>"
}
```

_Response (400 - Validation Error)_
```
{
  "message": "INVALID_EMAIL/PASSWORD"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

### GET /todos

> Get all todos

_Request Header_
```
{
  "access_token": "<user_access_token>"
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
        "title": "<todos title>",
        "description": "<todos description>",
        "status": "<todos status>",
        "due_date": "<todos due_date>",
        "createdAt": "2020-04-27T13:15:33.821Z",
        "updatedAt": "2020-04-27T13:39:19.162Z"
    },
    {
        "id": 2,
        "title": "<todos title>",
        "description": "<todos description>",
        "status": "<todos status>",
        "due_date": "<todos due_date>",,
        "createdAt": "2020-04-27T13:16:14.381Z",
        "updatedAt": "2020-04-27T14:34:23.800Z"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

### GET /todos/:id

> Get todos by Id

_Request Params_
```
Todo's ID
```

_Request Header_
```
{
  "access_token": "<user_access_token>"
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
        "id": <todos id>,
        "title": "<todos title>",
        "description": "<todos description>",
        "status": "<todos status>",
        "due_date": "<todos due_date>",
        "createdAt": "2020-04-27T13:15:33.821Z",
        "updatedAt": "2020-04-27T13:39:19.162Z"
    }
]
```

_Response (403 - Forbidden Access)_
```
{
  "message": "Forbidden Access"
}
```

_Response (404 - Error Not Found)_
```
{
  "message": "Error Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

### POST /todos

> Create new todos

_Request Header_
```
{
  "access_token": "<user_access_token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
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
  "createdAt": "2020-04-27T13:15:33.821Z",
  "updatedAt": "2020-04-27T13:39:19.162Z"
}
```

_Response (400 - Validation Error)_
```
{
  "message": "Title is required || Description is required || Status is required || Wrong Date Format"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

### PUT /todos/:id

> Update todos by Id

_Request Params_
```
Todo's ID
```

_Request Header_
```
{
  "access_token": "<user_access_token>"
}
```

_Request Body_
```
{
  "title": "<title to get update into>",
  "description": "<description to get update into>",
  "status": "<status to get update into>",
  "due_date": "<due_date to get update into>"
}
```

_Response (200)_
```
{
  "id": <given id by system>,
  "title": "<todos updated title>",
  "description": "<todos updated description>",
  "status": "<todos updated status>",
  "due_date": "<todos updated due_date>",
  "createdAt": "2020-04-27T13:15:33.821Z",
  "updatedAt": "2020-04-27T13:39:19.162Z"
}
```

_Response (400 - Validation Error)_
```
{
  "message": "message": "Title is required || Description is required || Status is required || Wrong Date Format"
}
```

_Response (404 - Error Not Found)_
```
{
  "message": "Error Not Found"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

### DELETE /todos/:id

> Delete todos by Id

_Request Params_
```
Todo's ID
```

_Request Header_
```
{
  "access_token": "<user_access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
Successfully deleted
```


_Response (404 - Error Not Found)_
```
{
  "message": "Error Not Found"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### POST /gogle-sign

> Sign in using google account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "id_token": "<id_token_from_google>"
}
```

_Response (200)_
```
{
  "access_token": "<user_access_token>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

### GET /calendar

> Get holiday dates

_Request Params_
```
{
  "api_key': "<api_key>",
  "country": 'ID',
  "year": 2020
}
```

_Request Header_
```
{
  "access_token": "<user_access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "name": "<holiday_name>",
  "description": "<holiday_description>",
  "date": "<holiday_date>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
