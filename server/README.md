# fancy-to-do
```
Create fancy to do app, using express, jquery, ajax
* RESTful endpoint for Todo List's CRUD operation
* JSON formatted response
```

# USAGE
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `nodemon app.js  to start the server.
Run `live-server --host=localhost` to start the client
```

##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:5500
Server URL : http://localhost:3000
```

### GET/todos

>get all todos list



_Request Header_
```
{
  access_token: token
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
            "id": 8,
            "title": "ngelap badan",
            "description": "andukan",
            "status": true,
            "due_date": "2020-01-06"
            
        },
        {
            "id": 3,
            "title": "masak rendang",
            "description": "gak di bagi-bagi",
            "status": true,
            "due_date": "2020-02-09"
            
        },
        {
            "id": 2,
            "title": "idup",
            "description": "sans",
            "status": true,
            "due_date": "2020-02-10"
          
        }
    ]
}
```

_Response(401- Unauthorized)_
```
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response (500 - Bad Request)_
```
{
  "Error": UNKWON_ERROR,
  "message": "Error undescribable"
}
```



### POST/todos

>Create new todos list

__Request Header_
```
{
  access_token: token
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
  "due_date": "<posted due_date>"
  
}
```
_Response(400- bad request)_
```
{
    "Error" :  VALIDATION_ERROR
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false"
}
```

_Response(401- Unauthorized)_
```
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```



_Response (500)_
```
{
   "Error": UNKWON_ERROR,
  "message": "Error undescribable"
}
```
### GET/todos/:id

>Get todos list by ID


__Request Header_
```
{
  access_token: token
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
        "id": 6,
        "title": "nyapu",
        "description": "nyapu kamar",
        "status": false,
        "due_date": "2020-01-01"
      
    }
}
```

_Response(401- Unauthorized)_
```
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response(403- Forbidden)_
```
{
    "Error" :  "FORBIDDEN_ACCESS"
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```

_Response (500)_
```
{
  "Error": "UNKWON_ERROR",
  "message": "Error undescribable"
}
```
### POST/todos/:id

>Update todos list by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "due_date": "<due_date to get updated later on>",
   "status": "<status to get updated later on>"
}
```
_Response(200)_
```
{
    "todo": [
        1
    ]
}
```

_Response(401- Unauthorized)_
```
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response(403- Forbidden)_
```
{
    "Error" :  "FORBIDDEN_ACCESS"
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```



_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false"
}
```
_Response (500)_
```

{
  "Error": "UNKWON_ERROR",
  "message": "Error undescribable"
}
```


### DELETE/todos/:id

>Delete todos list by ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
    "todo": 1
}
```

_Response(401- Unauthorized)_
```
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response(403- Forbidden)_
```
{
    "Error" :  "FORBIDDEN_ACCESS"
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```

_Response(404 - not found)_
```
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```
_Response (500)_
```
{
  "Error": "UNKWON_ERROR",
  "message": "Error undescribable"
}
```

### POST/register

>Create User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "name": "<User's Name>",
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(201)_
```
{
    "name": "Joey",
    "email": "joy@gmail.com",
    "password": "kvndlkfrnfoieneknne"
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Email required,Password required,Due date required, Invalid email format"
}
```


_Response (500)_
```
{
  "Error": "UNKWON_ERROR",
  "message": "Error undescribable"
}
```

### POST/login

>Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
   
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(200)_
```
{
    "access_token": alkdfknoeifheoifnien4y08
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Email required,Password required,Due date required, Invalid email format"
}
```


_Response (500)_
```
{
  "Error": "UNKWON_ERROR",
  "message": "Error undescribable"
}
```

### POST/google-sign-in

>Google Sign IN User

_Request Header_
```
not needed
```

_Request Body_
```
{
   
    "id_token": "id_token";
}
```

_Response(200)_
```
Google's Payload
```



_Response (500)_
```
{
  "Error": "UNKWON_ERROR",
  "message": "Error undescribable"
}
```
### GET/charity

>Get charity List

_Request Header_
```
not needed
```

_Request Body_
```
not need
```

_Response(200)_
```
{
    "data": {
        "code": 200,
        "msg": "OK, all went through!",
        "data": [
            {
                "categoryId": "?",
                "categoryDesc": "Not Provided"
            },
            {
                "categoryId": "A",
                "categoryDesc": "Arts, Culture and Humanities"
            },
            {
                "categoryId": "B",
                "categoryDesc": "Educational Institutions and Related Activities"
            },
            {
                "categoryId": "C",
                "categoryDesc": "Environmental Quality, Protection and Beautification"
            },
            {
                "categoryId": "D",
                "categoryDesc": "Animal-Related"
            },
            {
                "categoryId": "E",
                "categoryDesc": "Health - General and Rehabilitative"
            },
            {
                "categoryId": "F",
                "categoryDesc": "Mental Health, Crisis Intervention"
            },
            {
                "categoryId": "G",
                "categoryDesc": "Diseases, Disorders, Medical Disciplines"
            },
            {
                "categoryId": "H",
                "categoryDesc": "Medical Research"
            }
```



_Response (500)_
```
{
  "Error": "UNKWON_ERROR",
  "message": "Error undescribable"
}
```
