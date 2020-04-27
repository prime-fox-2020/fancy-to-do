# fancy-to-do
Create fancy to do app, using express, jquery, ajax

---

## RESTful endpoints
### GET /todos

> Get all todos

_Request Body_
```
not needed
```

_response (200)_
```
[
  {
    "id": 1,
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-04-27T10:14:40.744Z",
    "updatedAt": "2020-04-27T10:14:40.744Z"
  },
  {
    "id": 2,
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "createdAt": "2020-04-27T10:26:27.179Z",
    "updatedAt": "2020-04-27T10:26:27.179Z"
  }
]
```
_response (500 - Internal Server Error)_
```
{
  <error message>
}
```
---
### GET /todos/:id
> Get todos by id

_Request Body_
```
not needed
```

_response (200)_
```
{
  "id": 1,
  "title": "<todos title>",
  "description": "<todos description>",
  "status": "<todos status>",
  "due_date": "<todos due_date>",
  "createdAt": "2020-04-27T10:14:40.744Z",
  "updatedAt": "2020-04-27T10:14:40.744Z"
}
```

_response (404 - Not Found)_
```
{
  "error": "not found"
}
```

_response (500 - Internal Server Error)_
```
{
  <error message>
}
```
---

### POST /todos
> Create new todos

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
  "updatedAt": "2020-04-27T13:33:25.716Z",
  "createdAt": "2020-04-27T13:33:25.716Z"
}
```

_Response (400 - Bad Request)_
```
{
  <validation errors>
}
```

_response (500 - Internal Server Error)_
```
{
  <error message>
}
```
---

### PUT /todos/:id
> Update todos by id

_Request Body_
```
{
	"title": "<title to update>",
	"description": "<description to update>",
	"status": "<status to update>",
	"due_date": "<due_date to update>"
}
```

_Response (200)_
```
{
  "title": "<updated title>",
  "description": "<updated description>",
  "status": "<updated status>",
  "due_date": "<updated due_date>"
}
```

_Response (400 - Bad Request)_
```
{
  <validation errors>
}
```

_Response (404 - Not Found)_
```
{
  "error": "not found"
}
```

_response (500 - Internal Server Error)_
```
{
  <error message>
}
```
---

### DELETE /todos/:id
> Get todos by id

_Request Body_
```
not needed
```

_response (200)_
```
{
  "id": 1,
  "title": "<todos title>",
  "description": "<todos description>",
  "status": "<todos status>",
  "due_date": "<todos due_date>",
  "createdAt": "2020-04-27T10:14:40.744Z",
  "updatedAt": "2020-04-27T10:14:40.744Z"
}
```

_response (404 - Not Found)_
```
{
  "error": "not found"
}
```

_response (500 - Internal Server Error)_
```
{
  <error message>
}
```
---
