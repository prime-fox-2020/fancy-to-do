# fancy-to-do
Fancy to do App is an application to manage your task. This app has : 
* RESTful endpoint for todos CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /todos

> Get all todos

_Request Header_
```
not needed
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
  "message": "<returned error message>"
}
```

---
### GET /todos/:id

> Get todos by Id

_Request Header_
```
not needed
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

_Response (404 - Error Not Found)_
```
{
  "message": "<returned error message>"
}
```

---
### POST /todos

> Create new todos

_Request Header_
```
not needed
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
  "validation error": "<returned validation error>"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---
### PUT /todos/:id

> Update todos by Id

_Request Header_
```
not needed
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
  "validation error": "<returned validation error>"
}
```

_Response (404 - Error Not Found)_
```
{
  "message": "<returned error message>"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---
### DELETE /todos/:id

> Delete todos by Id

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <given id by system>,
  "title": "<todos deleted title>",
  "description": "<todos deleted description>",
  "status": "<todos deleted status>",
  "due_date": "<todos deleted due_date>",
  "createdAt": "2020-04-27T13:15:33.821Z",
  "updatedAt": "2020-04-27T13:39:19.162Z"
}
```


_Response (404 - Error Not Found)_
```
{
  "message": "<returned error message>"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```