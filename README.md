# fancy-to-do
A simple todo apps, created using node.js, express, sequelize, postgres. this app server & client side.
## Server side:
- RESTful endpoint for asset's CRUD operation
- Return JSON formatted response
- Tech stack: node.js, express, postgres, sequelize, google oauth, 3rd party API: Numbers (https://rapidapi.com/divad12/api/numbers-1)
## Client side:
- Tech stack: jquery, ajax, bootstrap


## REST endpoint
- [POST/ user/signup](#post-usersignup)
- [POST/ user/signin](#post-usersignin)
- [POST/ todos](#post-todos)
- [GET/ todos](#get-todos)
- [GET/ todos/:id](#get-todosid)
- [PUT/ todos/:id](#put-todosid)
- [DELETE/ todos/:id](#delete-todosid)
- [GET/ todos/getTrivia/:id](#get-todosgettriviaid)
---

> ## POST /user/signup

Sign up and create a new account

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### _Body_
```json
not needed
```

### Responses

#### _Status 201 Created_
```json
{
  "id": 19,
  "email": "koko@koko.com",
  "password": "$2b$10$PqZMSaUzSTCK25NMgfnbq.zSlF.F3VED/t0ZlX8Pt7LqpdGiOoqC6"
}
```

#### _Status 400 Bad Request_
```json
{
  "messages": [
    "Please fill your name",
    "Please enter the correct email address"
  ]
}
```

#### _Status 500 Internal Server Error_
```json
{
  "messages": [ "Internal server error" ]
}
```

> ## POST /user/signin

Sign in with email & password account

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### _Body_
```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

### Responses

#### _Status 200 OK_
```json
{
  "access_token": "<your access token>"
}
```

#### _Status 400 Bad Request_
```json
{
  "messages": [
    "Invalid email/password"
  ]
}
```

#### _Status 500 Internal Server Error_
```json
{
  "messages": [ "Internal server error" ]
}
```

> ## POST /todos

Create a new todo

### Requests

#### _Header_
```json
{
  "access_token": "<your access token>",
  "Content-Type": "application/x-www-form-urlencoded"
}
```

#### _Body_
```json
{
  "title": "<todo title: string>",
  "description": "<todo description: string>",
  "status": "<todo status: string>",
  "due_date": "<todo due_date: date(y-m-d)>"
}
```

### Responses

#### _Status 200 OK_
```json
{
  "message": "A todo has been created"
}
```

#### _Status 400 Bad Request_
```json
{
  "messages": [
    "Todo.title cannot be null"
  ]
}
```

#### _Status 403 Forbidden_
```json
{
  "messages": [ "Please sign in first" ]
}
```

#### _Status 500 Internal Server Error_
```json
{
  "messages": [ "Internal server error" ]
}
```

> ## GET /todos

Get all todos

### Requests

#### _Header_
```json
{
  "access_token": "<your access token>"
}
```

#### _Body_
```json
not needed
```

### Responses

#### _Status 200 OK_
```json
{
  "todos": [
    {
      "id": 15,
      "title": "Ujian",
      "description": "Biologi",
      "status": "Pending",
      "due_date": "2020-01-28T00:00:00.000Z",
      "UserId": 19,
      "createdAt": "2020-05-01T18:03:59.412Z",
      "updatedAt": "2020-05-01T18:03:59.412Z"
    },
    {
      "id": 14,
      "title": "Mengerjakan PR",
      "description": "Fisika",
      "status": "Pending",
      "due_date": "2020-01-28T00:00:00.000Z",
      "UserId": 19,
      "createdAt": "2020-05-01T18:03:48.384Z",
      "updatedAt": "2020-05-01T18:05:47.367Z"
    }
  ]
}
```

#### _Status 403 Forbidden_
```json
{
  "messages": [ "Please sign in first" ]
}
```

#### _Status 500 Internal Server Error_
```json
{
  "messages": [ "Internal server error" ]
}
```

> ## GET /todos/:id

Get a todo by its ID

### Requests

#### _Header_
```json
{
  "access_token": "<your access token>"
}
```

#### _Body_
```json
not needed
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "id": 12,
  "title": "Belajar",
  "description": "Matematika",
  "status": "Pending",
  "due_date": "2020-01-28T00:00:00.000Z",
  "UserId": 19,
  "createdAt": "2020-05-01T17:47:51.905Z",
  "updatedAt": "2020-05-01T17:47:51.905Z"
}
```

#### _Status 404 Not Found_
```json
{
  "messages": [
    "Todo ID 1 not found"
  ]
}
```

#### _Status 403 Forbidden_
```json
{
  "messages": [ "Please sign in first" ]
}
```

#### _Status 401 Unauthorized_
```json
{
  "messages": [ "You are not authorized" ]
}
```

#### _Status 500 Internal Server Error_
```json
{
  "messages": [ "Internal server error" ]
}
```

> ## PUT /todos/:id

Edit a todo

### Requests

#### _Header_
```json
{
  "Content-Type": "application/x-www-form-urlencoded",
  "access_token": "<your access token>"
}
```

#### _Body_
Choose the item property(s) that you want to edit
```json
{
  "title": "<todo title: string>",
  "description": "<todo description: string>",
  "status": "<todo status: string>",
  "due_date": "<todo due_date: date(y-m-d)>"
}
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "message": "Todo 14 has been updated"
}
```

#### _Status 404 Not Found_
```json
{
  "messages": [
    "Todo ID 1 not found"
  ]
}
```

#### _Status 403 Forbidden_
```json
{
  "messages": [ "Please sign in first" ]
}
```

#### _Status 401 Unauthorized_
```json
{
  "messages": [ "You are not authorized" ]
}
```

#### _Status 500 Internal Server Error_
```json
{
  "messages": [ "Internal server error" ]
}
```

> ## DELETE /todos/:id

Delete a todo

### Requests

#### _Header_
```json
{
  "access_token": "<your access token>"
}
```

#### _Body_
Choose the item property(s) that you want to edit
```json
not needed
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "message": "Todos id 13 has been deleted"
}
```

#### _Status 404 Not Found_
```json
{
  "messages": [
    "Todo ID 1 not found"
  ]
}
```

#### _Status 403 Forbidden_
```json
{
  "messages": [ "Please sign in first" ]
}
```

#### _Status 401 Unauthorized_
```json
{
  "messages": [ "You are not authorized" ]
}
```

#### _Status 500 Internal Server Error_
```json
{
  "messages": [ "Internal server error" ]
}
```

> ## GET /todos/getTrivia/:id

Get a trivia / special event that happened on todo due date

### Requests

#### _Header_
```json
{
  "access_token": "<your access token>"
}
```

#### _Body_
```json
not needed
```

#### _Parameters_
| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### _Status 200 OK_
```json
{
  "text": "United States claims Midway Atoll, the first territory annexed outside Continental limits",
  "year": 1867,
  "number": 363,
  "found": true,
  "type": "date"
}
```

#### _Status 404 Not Found_
```json
{
  "messages": [
    "Todo ID 1 not found"
  ]
}
```

#### _Status 403 Forbidden_
```json
{
  "messages": [ "Please sign in first" ]
}
```

#### _Status 401 Unauthorized_
```json
{
  "messages": [ "You are not authorized" ]
}
```

#### _Status 500 Internal Server Error_
```json
{
  "messages": [ "Internal server error" ]
}
```