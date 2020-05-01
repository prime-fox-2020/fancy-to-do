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
    "message": "<Incomplete Data or Wrong Input>"
}
```

_Response (404 - Not Found)_
```
{
    "message": "<Email or Password invalid>"
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

_Response (201 - Created)_
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
    "message": "<Incomplete data or Wrong Input>"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "<Email invalid>"
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
            "createdAt": "2020-04-27",
            "updatedAt": "2020-04-27"
        },
        {
            "id": 2,
            "title": "<asset name>",
            "description": "<asset description>",
            "status": true,
            "due_date": "2020-06-10",
            "createdAt": "2020-04-27",
            "updatedAt": "2020-04-27"
        },
        {
            "id": 3,
            "title": "<asset name>",
            "description": "<asset description>",
            "status": true,
            "due_date": "<asset due date>",
            "createdAt": "2020-04-27",
            "updatedAt": "2020-04-27"
        }
    ]
}
```

_Response (500 - Bad Request)_
```
{
    "message": "<Internal Server Error>"
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
  "createdAt": "2020-03-20",
  "updatedAt": "2020-03-20",
}
```

_Response (400 - bad request)_
```
{
    "error": "<incomplete data or Wrong Input>"
}
```

_Response (500 - Internal Server Error)_
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

_Response (200 - Ok)_
```
{
    "todo": {
        "id": <asset id>,
        "title": "<asset name>",
        "description": "<asset description>",
        "status": false,
        "due_date": "<asset due date>",
        "createdAt": "2020-04-27",
        "updatedAt": "2020-04-27"
    }
}
```

_Response (404 - not found)_
```
{
    "error" : "<Data not found>"
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

_Response (200 - Ok)_
```
{
    "todo": [ 1 ]
}
```

_Response (400 - bad request)_
```
{
    "error": "<Incomplete data or Wrong Input>"
}
```

_Response (404 - not found)_
```
{
    "error" : "<Data not found>"
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
    "todo": [ 1 ]
}
```

_Response(404 - not found)_
```
{
    "error": "<Data not found>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "<Internal server error>"
}
```