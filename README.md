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
```

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
  "errorCode":"UNKNOWN_ERROR"
  "message":"Internal Server Error"
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
  "errorCode":"VALIDATION_ERROR"
  "message": "Title is required, description is required,status is required,due_date is required"
}
```

_Response (404 - Not Found)_
```
{
  "errorCode":"TOKEN_NOT_FOUND"
  "message":"token not found"
}
```

_Response (500 - Internet Server Error)_
```
{
  "errorCode":"UNKNOWN_ERROR"
  "message":"Internal Server Error"
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
```

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
  "errorCode":"DATA_NOT_FOUND"
  "message":"Data not found"
},
{
  "errorCode":"TOKEN_NOT_FOUND"
  "message":"token not found"
}
```

_Response (403)_
```
{
  "errorCode":"FORBIDDEN_ACCESS"
  "message":"Forbidden Access"
}
```

_Response (500 - Internet Server Error)_
```
{
  "errorCode":"UNKNOWN_ERROR"
  "message":"Internal Server Error"
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
```

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
  "errorCode":"DATA_NOT_FOUND"
  "message":"Data not found"
},
{
  "errorCode":"TOKEN_NOT_FOUND"
  "message":"token not found"
}
```

_Response (403)_
```
{
  "errorCode":"FORBIDDEN_ACCESS"
  "message":"Forbidden Access"
}
```

_Response (500 - Internet Server Error)_
```
{
  "errorCode":"UNKNOWN_ERROR"
  "message":"Internal Server Error"
}
```
---

### DELETE /todos/ :id

> Delete project by id 

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
  "errorCode":"DATA_NOT_FOUND"
  "message":"Data not found"
},
{
  "errorCode":"TOKEN_NOT_FOUND"
  "message":"token not found"
}
```

_Response (403)_
```
{
  "errorCode":"FORBIDDEN_ACCESS"
  "message":"Forbidden Access"
}
```

_Response (500 - Internet Server Error)_
```
{
  "errorCode":"UNKNOWN_ERROR"
  "message":"Internal Server Error"
}
```
---

### POST /user/ register

> Register user 

_Request Header_
```
not needed
```

_Request Body_
```
{
	"email": email to register,
	"password": password to register
}
```

_Response (200)_
```
[
    {
        "id": 1,
        "email": "su@gmail.com",
        "password": "$2b$10$1E7/urX3VEOXf0Y7Evo41etLdQgii95.RW0FhFWpRZQqnYCHhFiLC",
        "createdAt": "2020-04-28T04:05:56.156Z",
        "updatedAt": "2020-04-28T04:05:56.156Z"
    },
    {
        "id": 2,
        "email": "jackson@gmail.com",
        "password": "$2b$10$mpGCUFX4qHbUNI/9cgALtuN04rCZ9bZ4FOTEJkoJ.q6orAgOds31G",
        "createdAt": "2020-04-28T05:01:59.625Z",
        "updatedAt": "2020-04-28T05:01:59.625Z"
    }
]
```

_Response (404 - Not Found)_
```
{
  "errorCode":"DATA_NOT_FOUND"
  "message":"Data not found"
},
{
  "errorCode":"NEED_ARGUMENT"
  "message":"data and salt arguments required"
}
```

_Response (400 - Bad Request)_
```
{
  "errorCode":"VALIDATION_ERROR"
  "message": "Email is required, Password is required"
}
```

_Response (500 - Internet Server Error)_
```
{
  "errorCode":"UNKNOWN_ERROR"
  "message":"Internal Server Error"
}
```
---

### POST /user/ login

> login user 

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
	"email": email that you registered before to login,
	"password": password that you registered before to login
}
```

_Response (200)_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoid2l3aUB5YWhvby5jb20iLCJpYXQiOjE1ODgzMjgxMzd9.WemjSdfy7dNal8b0vXz4SaqIjHJ3HwQIh9lE1cRxchs"
}
```

_Response (404 - Not Found)_
```
{
  "errorCode":"INVALID_ID"
  "message":"Invalid Email/Password"
}
```

_Response (400 - Bad Request)_
```
{
  "errorCode":"NEED_ARGUMENT"
  "message":"data and salt arguments required"
}
```

_Response (500 - Internet Server Error)_
```
{
  "errorCode":"UNKNOWN_ERROR"
  "message":"Internal Server Error"
}
```
---

### GET /imgur/ image

> get image 

_Request Header_
```
{
  "Authorization": "<your Client ID>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
            "id": "DpD6xcO",
            "title": null,
            "description": null,
            "datetime": 1588164134,
            "type": "image/png",
            "animated": false,
            "width": 579,
            "height": 404,
            "size": 27397,
            "views": 0,
            "bandwidth": 0,
            "vote": null,
            "favorite": false,
            "nsfw": null,
            "section": null,
            "account_url": "jackzro",
            "account_id": 129369531,
            "is_ad": false,
            "in_most_viral": false,
            "has_sound": false,
            "tags": [],
            "ad_type": 0,
            "ad_url": "",
            "edited": "0",
            "in_gallery": false,
            "deletehash": "DJsksD9yGPvZdOb",
            "name": null,
            "link": "https://i.imgur.com/DpD6xcO.png"
        },
]
```

_Response (500 - Internet Server Error)_
```
{
  "errorCode":"UNKNOWN_ERROR"
  "message":"Internal Server Error"
}
```
---