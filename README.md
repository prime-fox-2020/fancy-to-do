# Fancy To Do
Fancy To Do is an simple application to manage all that you have to do. This app has : 
* RESTful endpoint for todo's CRUD operation
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
  "updatedAt": "2020-04-27T08:15:43.281Z",
  "createdAt": "2020-04-27T08:15:43.281Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid Input!"
}
```
---
### GET /todos/:id

> Find todos with specific ID

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
  "message": "<returned error message>"
}
```
---
### PUT /todos/:id

> Update todos with specific ID

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

_Response (200 - Created)_
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
  "message": "<returned error message>"
}
```
---
### DELETE /todos/:id

> Delete todos with specific ID

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
  "message": "<returned error message>"
}
```
---
### SERVER FAILED

> If server failed to respon

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error>"
}
```
