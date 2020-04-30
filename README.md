# Fancy Todo App
Create fancy to do app, using express, jquery, ajax

&nbsp;

## RESTful endpoints
### POST /register

_Request Body_
```
{
  "email" : "admin@gmail.com",
  "password" : "12345"
}

```

_Response (201 - Created)_
```
{
    "id": 3,
    "email": "admin3@gmail.com",
    "password": "$2b$04$cwCCRh7oWAPi..MZlnd9eOp9tqXYLCMeWKoGswGLnkaFMZLk/O1UW"
}
```

_Response (400 - Bad Request)_
```
{
  "errorCode": "EMAIL_ALREADY_USED",
  "message": "Email has been already used"
},
{
  "errorCode": "VALIDATION_ERROR",
  "message": "Title is required, Description is required, Due date is required"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /login

_Request Body_
```
{
  "email" : "admin3@gmail.com",
  "password" : "12345"
}
```

_Response (200)_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbjNAZ21haWwuY29tIiwiaWF0IjoxNTg4MDUwNTEzfQ.TnvvIXgLEs72xdjQbimFRex2VUo7oirA12P2Qn_fLFk"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid Email / Password"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /todos

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbjNAZ21haWwuY29tIiwiaWF0IjoxNTg4MDUwNTEzfQ.TnvvIXgLEs72xdjQbimFRex2VUo7oirA12P2Qn_fLFk"
}
```

_Request Body_
```
{
	"title": "game",
	"description": "gaming",
	"status": false,
	"due_date": 2020/04/28"
}
```

_Response (200)_
```
{
  "id": 2,
  "title": "game",
  "description": "gaming",
  "status": false,
  "due_date": "2020-04-28T17:00:00.000Z",
  "UserId": 3,
  "updatedAt": "2020-04-28T05:01:33.366Z",
  "createdAt": "2020-04-28T05:01:33.366Z"
}
```

_Response (400 - Bad Request)_
```
{
  "validation error": "< validation message details >"
},
{
  "message" : "Invalid token"
}
```

_Response (401)_
```
{
  "message": "User not authenticated" 
}
```

_Response (500)_
```
{
  "errorCode": "UNKNOWN_ERROR",
  "message": ""
}
```
---
### GET /todos

_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbjNAZ21haWwuY29tIiwiaWF0IjoxNTg4MDUwNTEzfQ.TnvvIXgLEs72xdjQbimFRex2VUo7oirA12P2Qn_fLFk"
}
```

_Request Body_
```
none
```

_Response (200)_
```
[
  {
    "id": 2,
    "title": "game",
    "description": "gaming",
    "status": false,
    "due_date": "2020-04-28T17:00:00.000Z",
    "createdAt": "2020-04-28T05:01:33.366Z",
    "updatedAt": "2020-04-28T05:01:33.366Z",
    "UserId": 3
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid token"
}
```

_Response (401)_
```
{
  "message": "User not authenticated" 
}
```

_Response (500)_
```
{
  "errorCode": "UNKNOWN_ERROR",
  "message": ""
}
```
---
### GET /todos/:id

_Request Params_
```
:id - Todos id
```


_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbjNAZ21haWwuY29tIiwiaWF0IjoxNTg4MDUwNTEzfQ.TnvvIXgLEs72xdjQbimFRex2VUo7oirA12P2Qn_fLFk"
}
```

_Request Body_
```
none
```

_Response (200)_
```
{
  "id": 2,
  "title": "game",
  "description": "gaming",
  "status": false,
  "due_date": "2020-04-28T17:00:00.000Z",
  "createdAt": "2020-04-28T05:01:33.366Z",
  "updatedAt": "2020-04-28T05:01:33.366Z",
  "UserId": 3
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Invalid token"
}
```

_Response (401)_
```
{
  "message": "User not authenticated" 
}
```

_Response (403)_
```
{
  "message": "Forbidden Access" 
}
```

_Response (404 - Not Found)_
```
{
  "errorCode": "DATA_NOT_FOUND",
  "message": "No data matched"
}
```

_Response (500)_
```
{
  "errorCode": "UNKNOWN_ERROR",
  "message": ""
}
```
---
### PUT /todos/:id

_Request Params_
```
:id - Todos id
```


_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbjNAZ21haWwuY29tIiwiaWF0IjoxNTg4MDUwNTEzfQ.TnvvIXgLEs72xdjQbimFRex2VUo7oirA12P2Qn_fLFk"
}
```

_Request Body_
```
{
  "title": "game",
  "description": "gaming",
  "status": true,
  "due_date": 2020/04/29
}
```

_Response (200)_
```
{
  "title": "game",
  "description": "gaming",
  "status": "true",
  "due_date": "2020/05/01"
}
```

_Response (400 - Bad Request)_
```
{
  "validation error": "< validation message details >" 
},
{
  "message": "Invalid token"
}
```

_Response (401)_
```
{
  "message": "User not authenticated" 
}
```

_Response (403)_
```
{
  "message": "Forbidden Access" 
}
```

_Response (404 - Not Found)_
```
{
  "errorCode": "DATA_NOT_FOUND",
  "message": "No data matched"
}
```

_Response (500)_
```
{
  "errorCode": "UNKNOWN_ERROR",
  "message": ""
}
```
---
### DELETE /todos/:id

_Request Params_
```
:id - Todos id
```


_Request Header_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbjNAZ21haWwuY29tIiwiaWF0IjoxNTg4MDUwNTEzfQ.TnvvIXgLEs72xdjQbimFRex2VUo7oirA12P2Qn_fLFk"
}
```

_Request Body_
```
none
```

_Response (200)_
```
{
  "id": 2,
  "title": "game",
  "description": "gaming",
  "status": true,
  "due_date": "2020-04-30T17:00:00.000Z",
  "createdAt": "2020-04-28T05:01:33.366Z",
  "updatedAt": "2020-04-28T05:14:47.105Z",
  "UserId": 3
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid token"
}
```

_Response (401)_
```
{
  "message": "User not authenticated" 
}
```

_Response (403)_
```
{
  "message": "Forbidden Access" 
}
```

_Response (404 - Not Found)_
```
{
  "errorCode": "DATA_NOT_FOUND",
  "message": "No data matched"
}
```

_Response (500)_
```
{
  "errorCode": "UNKNOWN_ERROR",
  "message": ""
}
```
---

