# fancy-to-do
Create fancy to do app, using express, jquery, ajax

## RESTful endpoints
### GET /todos

> Get all projects

_Request Header_
```
{
  "access_token": "<your access token>"
}

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 2,
        "title": "popo",
        "description": "test",
        "status": "done",
        "due_date": "2011-01-03",
        "createdAt": "2020-04-27T06:36:16.023Z",
        "updatedAt": "2020-04-27T06:59:04.969Z"
    },
    {
        "id": 3,
        "title": "tiga",
        "description": "tiga",
        "status": "done",
        "due_date": "2011-01-03",
        "createdAt": "2020-04-27T06:39:44.035Z",
        "updatedAt": "2020-04-27T07:01:21.006Z"
    }
]
```

_Response (500 - Internet Server Error)_
```
{
  "message": "<returned error message>"
}
```

---
### POST /todos

> Create new project

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<name to get insert into>",
  "description": "<description to get insert into>"
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
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<returned error message>"
}
```

_Response (500 - Internet Server Error)_
```
{
  "message": "<returned error message>"
}
```
---
### GET /todos/ :id

> Get project by id 

_Request Header_
```
{
  "access_token": "<your access token>"
}

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 3,
    "title": "tiga",
    "description": "tiga",
    "status": "done",
    "due_date": "2011-01-03",
    "createdAt": "2020-04-27T06:39:44.035Z",
    "updatedAt": "2020-04-27T07:01:21.006Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<returned error message>"
}
```
---
### PUT /todos/ :id

> Update project by id 

_Request Header_
```
{
  "access_token": "<your access token>"
}

_Request Body_
```
{
  "name": "<name to get update into>",
  "description": "<description to get update into>"
  "status": "<status to get update into>",
  "due_date": "<due_date to get update into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```


_Response (404 - Not Found)_
```
{
  "message": "<returned error message>"
}
```

_Response (500 - Internet Server Error)_
```
{
  "message": "<returned error message>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<returned error message>"
}
```
---

### GET /todos/ :id

> Delete project by id 

_Request Header_
```
{
  "access_token": "<your access token>"
}

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <given id by system>,
  "name": "<deleted name>",
  "description": "<deleted description>",
  "status": "<deleted status>",
  "due_date": "<deleted due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<returned error message>"
}
```

_Response (500 - Internet Server Error)_
```
{
  "message": "<returned error message>"
}
```
---