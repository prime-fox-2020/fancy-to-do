# Fancy To Do
Fancy To Do is an simple application to manage all that you have to do. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "username": "<posted username>",
  "email": "<posted email>",
  "password": "<posted hash password>"
  "updatedAt": "2020-04-27T08:15:43.281Z",
  "createdAt": "2020-04-27T08:15:43.281Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Email already registered!"
}
```
---
### POST /login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid email/ password"
}
```
---
### GET /todos

> Get all todos

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
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-04-27T05:50:15.434Z",
    "updatedAt": "2020-04-27T07:21:25.147Z"
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-04-27T05:50:15.434Z",
    "updatedAt": "2020-04-27T07:21:25.147Z"
  }
]
```
---
### POST /todos

> Create new todos

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
  "UserId": "<posted UserId>",
  "updatedAt": "2020-04-27T08:15:43.281Z",
  "createdAt": "2020-04-27T08:15:43.281Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title is required!/ Description is required!/ Date is required!"
}
```
---
### GET /todos/:id

> Find todos with specific ID

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
    "id": <given id by request>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-04-27T05:50:15.434Z",
    "updatedAt": "2020-04-27T07:21:25.147Z"
  }
]
```

_Response (404 - Not Found)_
```
{
  "message": "Todo is not found!"
}
```
---
### PUT /todos/:id

> Update todos with specific ID

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
  "due_date": "<due_date to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "id": <given id by request>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "updatedAt": "2020-04-27T08:15:43.281Z",
  "createdAt": "2020-04-27T08:15:43.281Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Title is required!/ Description is required!/ Date is required!"
}
```
---
### DELETE /todos/:id

> Delete todos with specific ID

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
    "id": <given id by request>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>",
    "createdAt": "2020-04-27T05:50:15.434Z",
    "updatedAt": "2020-04-27T07:21:25.147Z"
  }
]
```

_Response (404 - Not Found)_
```
{
  "message": "Todo is not found"
}
```
---
### GET /todos/holidays

> Get list holidays

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```not needed
```

_Response (200 - OK)_
```
[
  {
    "name": "<name holiday>",
    "description": "<description holiday>",
    "date": "<date holiday>",
    "country": "<country holiday>",
    "type": "<type holiday>",
  }
]
```

&nbsp;

## ERROR
> Authentication, Authorization and Internal Server

---
### FORBIDDEN

> If the request was a legal request, but the server is refusing to respond to it

_Response (403 - Forbidden)_
```
{
  "message": "403 - Forbidden Access is denied."
}
```

---

### UNAUTHORIZATED

> If authentication is needed to get requested response.

_Response (401 - Unauthorized)_
```
{
  "message": "401 - Unauthorized."
}
```

---

### SERVER FAILED

> If server failed to respon

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
