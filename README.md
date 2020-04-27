# fancy-to-do
Create fancy to do app, using express, jquery, ajax


## RESTful endpoints
### GET /todos

> Get all todos

_Request Header_
```
updated soon
```

_Request Body_
```
not needed
```

_Response(200)_
```
[
    {
        "id": 1,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "2020-04-27T10:15:59.046Z",
        "createdAt": "2020-04-27T10:15:59.051Z",
        "updatedAt": "2020-04-27T10:15:59.051Z"
    },
    {
        "id": 2,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "2020-04-27T10:18:33.613Z",
        "createdAt": "2020-04-27T10:18:33.616Z",
        "updatedAt": "2020-04-27T10:18:33.616Z"
    }
]
```

_Response(500)_
```
{
  message: "ada kesalahan pada server", 
  detail: "<todo err>"
}
```

### POST/todos

_Request Header_
```
updated soon
```

_Request Body_
```
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>"
}
```

_Response(201)_
```
{
    "todo": {
        "id": 1,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "2020-04-27T12:01:48.415Z",
        "updatedAt": "2020-04-27T12:01:48.417Z",
        "createdAt": "2020-04-27T12:01:48.417Z"
    },
    "message": "Todo berhasil dibuat"
}
```

_Response(400)_
```
{
    "error": "validation error",
    "detail": {
        "title": "title cannot be empty",
        "description": "description cannot be empty",
        "status": "status cannot be empty"
    }
}
```

_Response(500)_
```
{
  message: "ada kesalahan pada server", 
  detail: "<todo err>"
}
```

### GET/todos/:id

_Request Header_
```
updated soon
```

_Request Params_
```
{ id : "<todo id>" }
```

_Request Body_
```
not needed
```

_Response(200)_
```
{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2020-04-27T10:15:59.046Z",
    "createdAt": "2020-04-27T10:15:59.051Z",
    "updatedAt": "2020-04-27T10:15:59.051Z"
}
```

_Response(404)_
```
{
    "error": "404 not found"
}
```

### PUT/todos/:id

_Request Header_
```
updated soon
```

_Request Params_
```
{ id : "<todo id>" }
```

_Request Body_
```
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>"
}
```

_Response(200)_
```
{
    "message": "sucessfully update data"
}
```

_Response(400)_
```
{
    "error": "validation error",
    "detail": {
        "title": "title cannot be empty",
        "description": "description cannot be empty",
        "status": "status cannot be empty"
    }
}
```

_Response(404)_
```
{error: '404 not found'}
```

_Response(500)_
```
{
  message: "ada kesalahan pada server", 
  detail: "<todo err>"
}
```

### DELETE/todos/:id

_Request Header_
```
updated soon
```

_Request Params_
```
{ id : "<todo id>" }
```

_Request Body_
```
not needed
```

_Response(200)_
```
{
  message: 'successfully delete todos'
}
```

_Response(500)_
```
{
  message: "ada kesalahan pada server", 
  detail: "<todo err>"
}
```