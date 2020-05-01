# fancy-to-do
A simple todo apps, created using node.js, express, sequelize, postgres. this app server & client side.
## Server side:
Tech stack: node.js, express, postgres, sequelize, google oauth, 3rd party API: Numbers (https://rapidapi.com/divad12/api/numbers-1).&#13;
Server side has:
- RESTful endpoint for asset's CRUD operation
- Return JSON formatted response
## Client side:
Tech stack: jquery, ajax, bootstrap


## REST endpoint
- [POST/ user/signup](#get-todos)
- [POST/ user/signin](#get-todos)
- [POST/ todos](#post-todos)
- [GET/ todos](#get-todos)
- [GET/ todos/:id](#get-todosid)
- [PUT/ todos/:id](#put-todosid)
- [DELETE/ todos/:id](#delete-todosid)
- [GET/ todos/getTrivia/:id](#delete-todosid)
---
## GET/todos

> get list of all todos

### Responses

#### status 200 OK
```json
[
    {
        "id": 1,
        "title": "Learn Rest API",
        "description": "learn Rest API using node js, express, sequelize, postgres. only server side",
        "status": "not completed",
        "due_date": "2020-03-30",
        "createdAt": "2020-03-30T06:27:59.739Z",
        "updatedAt": "2020-03-30T07:48:47.349Z"
    },
    {
        "id": 2,
        "title": "Learn Rest API 2",
        "description": "learn Rest API using node js, express, sequelize, postgres. client and server side",
        "status": "not completed",
        "due_date": "2020-04-01",
        "createdAt": "2020-04-01T06:27:59.739Z",
        "updatedAt": "2020-04-01T07:48:47.349Z"
    }
]
```

#### status 500
```json
{
    message: "internal server error"
}
```

## GET/todos/:id

get specific todo item

### parameter

| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### status 200 OK
```json
{
    "id": 2,
    "title": "Learn Rest API 2",
    "description": "learn Rest API using node js, express, sequelize, postgres. client and server side",
    "status": "not completed",
    "due_date": "2020-04-01",
    "createdAt": "2020-04-01T06:27:59.739Z",
    "updatedAt": "2020-04-01T07:48:47.349Z"
}
```
### status 404 Not Found
```json
example todo item does not exist:
{
    "message": "todo item is not found"
}
```

## POST/todos

add new todo item

### Request Body
```json
example:
{
	"title": "Learn Rest API 3",
	"description": "New Description",
	"status": "not completed",
	"due_date": "2020-04-05"
}
```
### Responses

#### status 201 OK
```json
example:
{
    "id": 3
	"title": "Learn Rest API 3",
	"description": "New Description",
	"status": "not completed",
    "due_date": "2020-04-05",
    "updatedAt": "2020-04-02T08:50:00.721Z",
    "createdAt": "2020-04-02T08:50:00.721Z"
}
```

#### status 400 Bad Request
```json
{
    message: [
        "title cannot be empty",
        "description is null"
    ]
}
```

#### status 500
```json
{
    message: "internal server error"
}
```

## PUT/todos/:id

update specific todo item

### parameter

| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Request Header
```
{
	"Content-Type": "application/json"
}
```
### Request Body
```json
example:
{
	"title": "Learn Rest API 3",
	"description": "New Description Edited",
	"status": "not completed",
	"due_date": "2020-04-05"
}
```
### Responses

#### status 201 OK
```json
example:
{
    "id": 3
	"title": "Learn Rest API 3",
	"description": "New Description Edited",
	"status": "not completed",
    "due_date": "2020-04-05",
    "updatedAt": "2020-04-02T08:50:00.721Z",
    "createdAt": "2020-04-02T08:50:00.721Z"
}
```

### status 404 Not Found
```json
example todo item does not exist:
{
    "message": "todo item is not found"
}
```

#### status 400 Bad Request
```json
{
    message: [
        "title cannot be empty",
        "description is null"
    ]
}
```

#### status 500
```json
{
    message: "internal server error"
}
```

## DELETE/todos/:id

delete specific todo item

### parameter

| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Responses

#### status 201 OK
```json
example:
{
    "id": 3
	"title": "Learn Rest API 3",
	"description": "New Description Edited",
	"status": "not completed",
    "due_date": "2020-04-05",
    "updatedAt": "2020-04-02T08:50:00.721Z",
    "createdAt": "2020-04-02T08:50:00.721Z"
}
```

### status 404 Not Found
```json
example todo item does not exist:
{
    "message": "todo item is not found"
}
```