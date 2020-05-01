# fancy-to-do
Create fancy to do app, using express, jquery, ajax

My fancy to do App is an application to manage your task. This app has : 
* RESTful endpoint for asset's CRUD operation
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
    "name": "<todos name>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<todos name>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
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

> Get todos with specific id

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
    "id": <todos id by request>,
    "name": "<todos name>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
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
### POST /todos

> Create new todos

_Request Header_
```
not needed
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
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
},
{
  "message": "<returned success message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
### PUT /todos/:id

> Update todos with specific id

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
    "name": "<todos updated name>",
    "description": "<todos updated description>",
    "status": "<todos updated status>",
    "due_date": "<todos updated due_date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
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
### DELETE /todos/:id

> Delete todos with specific id

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
  "message": "<returned successfully  message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
---
