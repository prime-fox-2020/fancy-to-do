# fancy-to-do
Create fancy to do app, using express, jquery, ajax

* RESTful endpoint for toDo's CRUD operation
* JSON formatted response

## RESTful endpoints
### GET /todos

> Get all toDo-List

_Request Header_
```
{
  "comming soon"
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
        "due_date": "<todos date>",
        "createdAt": "2020-04-27T07:20:33.949Z",
        "updatedAt": "2020-04-27T07:20:33.949Z"
    },
    {
        "id": 2,
        "title": "<todos title>",
        "description": "<todos description>",
        "status": "<todos status>",
        "due_date": "<todos date>",
        "createdAt": "2020-04-27T07:21:47.000Z",
        "updatedAt": "2020-04-27T08:12:59.330Z"
    }
]

```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /todos /:id

> Find toDo-List based on Id

_Request Header_
```
{
  "comming soon"
}

```

_Request Body_
```
not needed
```

_Request Params_
```
{ idx: ':id' }
```

_Response (200 - Ok)_
```
[
    {
        "id": 1 <if req.params.id is '1'>,
        "title": "<todos title>",
        "description": "<todos description>",
        "status": "<todos status>",
        "due_date": "<todos date>",
        "createdAt": "2020-04-27T07:20:33.949Z",
        "updatedAt": "2020-04-27T07:20:33.949Z"
    }
]

```

_Response (404 - Not Found)_
```
{
    "message": "data tidak ditemukan"
}
```

### POST /todos

> Create new toDo-List

_Request Header_
```
{
  "comming soon"
}

```

_Request Body_
```
{
  "title": "<posted title of toDo-list>",
  "description": "<posted description of toDo-list>",
  "status": "<posted status>",
  "due_date": "<posted date>"
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
    "updatedAt": "2020-04-27T11:19:26.267Z",
    "createdAt": "2020-04-27T11:19:26.267Z"
}
```

_Response (400 - Bad Request)_
```
{
    "message": [
        "kolom title belum diisi" <if title column is empty>
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### PUT /todos/:id

> Update toDo-List based in Id

_Request Header_
```
{
    "comming soon"
}

```

_Request Body_
```
{
  "title": "<updated title of toDo-list>",
  "description": "<updated description of toDo-list>",
  "status": "<todos status>",
  "due_date": "<todos date>",
}
```

_Request Params_
```
{ id: ':id' }
```

_Response (200 - Ok)_
```
{
    "id": <given id by system>,
    "title": "<updated title>",
    "description": "<updated description>",
    "status": "<update status>",
    "due_date": "<update date>",
    "updatedAt": "2020-04-27T11:19:26.267Z",
    "createdAt": "2020-04-27T11:19:26.267Z"
}
```

_Response (400 - Bad Request)_
```
{
    "message": [
        "kolom title belum diisi" <if title column is empty>,
    ]
}
```

_Response (404 - Not Found)_
```
{
    "message": "data tidak ditemukan"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### DELETE /todos/:id

> Delete toDo-List based on Id

_Request Header_
```
{
  "comming soon"
}

```

_Request Body_
```
not needed
```

_Request Params_
```
{ id: idx }
```


_Response (200 - Ok)_
```
{
    "message": "data berhasil dihapus"
}
```

_Response (404 - Not Found)_
```
{
    "message": "data tidak ditemukan"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```