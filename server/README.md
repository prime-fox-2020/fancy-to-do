# Todo App
* * *

Todo app is an application to manage your todo list.
This app has:
- RESTful endpoint for asset's CRUD operation
- JSON formatted response

## RESTful Endpoint

### POST /login

> post login

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

_Response (200)_
```
{
  "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "<Wrong email and password>"
}
```


### POST /register

> post register

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

_Response (200)_
```
{
  "id": "<server generated id>",
  "email": "<your email>",
  "password": "<your hashed password>",
  "updatedAt": "2020-04-29T08:05:55.184Z",
  "createdAt": "2020-04-29T08:05:55.184Z"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "<Incomplete data>"
}
```

#### GET /todos

> get all assets

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

_Response (200)_
```
{
    "Todo": [
       
        {
            "id": 1,
            "title": "<asset name>",
            "description": "<asset description>",
            "status": true,
            "due_date": "2021-01-08",
            "createdAt": "2020-04-27T10:04:46.363Z",
            "updatedAt": "2020-04-27T10:04:46.363Z"
        },
        {
            "id": 2,
            "title": "<asset name>",
            "description": "<asset description>",
            "status": true,
            "due_date": "2020-06-10",
            "createdAt": "2020-04-27T08:22:50.398Z",
            "updatedAt": "2020-04-27T10:24:23.366Z"
        },
        {
            "id": 3,
            "title": "<asset name>",
            "description": "<asset description>",
            "status": true,
            "due_date": "2020-05-05",
            "createdAt": "2020-04-27T08:21:02.924Z",
            "updatedAt": "2020-04-27T10:26:27.203Z"
        }
    ]
}
```

_Response (400 - Bad Request)_
```
{
    "message": "<incomplete data>"
}
```


### POST /todos

> Create new asset

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
    "due_date": "<due_date to get insert into>",
    "status": "<status to get insert into>"
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
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - bad request)_
```
{
    "error": "<incomplete data>"
}
```

_Response (500)_
```
{
    "error": "<Internal server error>"
}
```


### GET /todos/:id

> Get asset by Id

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

_Response (200)_
```
{
    "todo": {
        "id": <asset id>,
        "title": "<asset name>",
        "description": "<asset description>",
        "status": false,
        "due_date": "<asset date>",
        "createdAt": "2020-04-27T08:35:09.002Z",
        "updatedAt": "2020-04-27T08:35:09.002Z"
    }
}
```

_Response (404 - not found)_
```
{
    "error" : "Data not found"
}
```

_Response (500)_
```
{
    "error": "<Internal server error>"
}
```


### POST /todos/:id

> Update asset by Id

_Request Body_
```
{
    "title": "<title to get updated later on>",
    "description": "<description to get updated later on>",
    "due_date": "<due_date to get updated later on>",
    "status": "<status to get updated later on>"
}
```

_Response (200)_
```
{
    "todo": [ 1 ]
}
```

_Response (404 - not found)_
```
{
    "error" : "Data not found"
}
```

_Response (400 - bad request)_
```
{
    "error": "<Incomplete data>"
}
```

_Response (500)_
```
{
    "error": "<Internal server error>"
}
```


### DELETE/todos/:id

> Delete todos list by ID

_Response(200)_
```
{
    "todo": [1]
}
```

_Response(404 - not found)_
```
{
    "error": "Data not found"
}
```

_Response (500)_
```
{
  "error": "<Internal server error>"
}
```