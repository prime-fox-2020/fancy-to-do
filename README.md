# fancy-to-do
Create SPA fancy todo, using express, jquery, ajax

## REST endpoint
- [POST/ register](#postregister)
- [POST/ login](#postlogin)
- [POST/ googleSign](#postgoogleSign)
- [POST/ facebookLogin](#postfacebookLogin)
- [GET/ users](#getusers)
- [GET/ project](#getproject)
- [GET/ todos](#gettodos)
- [GET/ todos/:id](#gettodosid)
- [POST/ todos](#posttodos)
- [PUT/ todos/:id](#puttodosid)
- [PATCH/ todos/:id](#patchtodosid)
- [DELETE/ todos/:id](#deletetodosid)
- [POST/ todos/holidays](#posttodosholidays)


## POST/register

### Request Body
```json
{
	"email": "user@email.com",
	"password": "12345"
}
```

### Response

#### 200
```json
{
    "id": 4,
    "email": "user@email.com",
    "password": "$2b$08$L4edrrKbJYZACAD8Ub05BuhyM6I/1c7l8Ya13vSAch/nyGDnWtD16"
}
```

#### 400
```json
[
    {
        "message": "email already being used" "||" "email cannot be empty"
    },
    {
        "message": "password is null" "||" "password cannot be empty"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```


## POST/login

### Request Body
```json
{
	"email": "user@email.com",
	"password": "12345"
}
```

### Response

#### 200
```json
{
    "access_token": "random string token"
}
```

#### 400
```json
[
    {
        "message": "email or password is wrong"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```


## POST/googleSign
sign in using google account

### Request Body
```json
{
    "id_token": "id token generated by google"
}
```

### Response

#### 200
```json
{
    "access_token": "random string token"
}
```


## POST/facebookLogin
sign in using facebook account

### Request Body
```json
{
    "user_token": "token generated by facebook"
}
```

### Response

#### 200
```json
{
    "access_token": "random string token"
}
```


## GET/users
get list of all users

### Request Headers
```json
{
	"access_token": "random string token"
}
```
### Response

#### 200
```json
[
    {
        "id": 1,
        "email": "user@email.com",
        "password": "$2b$08$mKJ8Mu8DFMwLp8p/acmSaOHigXMAvwXT.SO3hAkfvi8C1XsNr0r6G",
        "createdAt": "2020-05-01T17:04:37.535Z",
        "updatedAt": "2020-05-01T17:04:37.535Z"
    },
    {
        "id": 2,
        "email": "user2@email.com",
        "password": "$2b$08$9VBhVFVg5cjCTnBunsHMROB3rxbGFo9WIU7sz/LMDXiQe4OLkEhG6",
        "createdAt": "2020-05-01T17:05:54.750Z",
        "updatedAt": "2020-05-01T17:05:54.750Z"
    },
    {
        "id": 3,
        "email": "user3@email.com",
        "password": "$2b$08$yPrLWzr8d9q86Orr3xeRl.TPmd0bMS99Stbz51PaNoxpJqj9JUEwG",
        "createdAt": "2020-05-01T17:06:34.254Z",
        "updatedAt": "2020-05-01T17:06:34.254Z"
    },
    {
        "id": 4,
        "email": "lexxx.arthur@gmail.com",
        "password": "$2b$08$KdPN0KoMx4cznyupf2z6rufQczSCvD3ZUp2KiOZtk2amBG8MTtCFe",
        "createdAt": "2020-05-01T17:10:45.909Z",
        "updatedAt": "2020-05-01T17:10:45.909Z"
    }
]
```
#### 401
```json
[
    {
        "message": "authentication problem"
    }
]
```

#### 404
```json
[
    {
        "message": "user not found" "||" "token not found"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```


## GET/project
get list of project in which currently login user is the member

### Request Headers
```
{
	"access_token": "random string token"
}
```

### Responses

#### 200
```json
[
    {
        "UserId": 2,
        "TodoId": 1,
        "project": "User Project",
        "createdAt": "2020-05-01T20:28:36.391Z",
        "updatedAt": "2020-05-01T20:32:25.822Z"
    },
    {
        "UserId": 2,
        "TodoId": 4,
        "project": "project guser",
        "createdAt": "2020-05-01T21:04:27.947Z",
        "updatedAt": "2020-05-01T21:05:01.808Z"
    },
    {
        "UserId": 2,
        "TodoId": 5,
        "project": "project x",
        "createdAt": "2020-05-01T21:50:34.287Z",
        "updatedAt": "2020-05-01T21:51:01.483Z"
    }
]
```

#### 401
```json
[
    {
        "message": "authentication problem"
    }
]
```

#### 403
```json
[
    {
        "message": "cannot be accessed"
    }
]
```

#### 404
```json
[
    {
        "message": "user not found" "||" "token not found" "||" "todo not found"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```


## POST/project
create new project
### Request Headers
```
{
	"access_token": "random string token"
}
```

### Responses

#### 200
```json
{
    "message": "project created"
}
```

#### 401
```json
[
    {
        "message": "authentication problem"
    }
]
```

#### 403
```json
[
    {
        "message": "cannot be accessed"
    }
]
```

#### 404
```json
[
    {
        "message": "user not found" "||" "token not found" "||" "todo not found"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```



## GET/todos
get list of all todos

### Request Headers
```json
{
	"access_token": "random string token"
}
```
### Response

#### 200
```json
[
    {
        "project": "project name",
        "todo": {
                    "id": 1,
                    "title": "Todo 1",
                    "description": "description 1",
                    "status": "not completed",
                    "due_date": "2020-04-27",
                    "createdAt": "2020-04-27T06:27:59.739Z",
                    "updatedAt": "2020-04-27T07:48:47.349Z"
                }
    },
    {
        "project": "project 2 name",
        "todo": {
                    "id": 2,
                    "title": "Todo 2",
                    "description": "description 2",
                    "status": "not completed",
                    "due_date": "2020-04-29",
                    "createdAt": "2020-04-27T06:27:59.739Z",
                    "updatedAt": "2020-04-27T07:48:47.349Z"
                }
    }
]
```
#### 401
```json
[
    {
        "message": "authentication problem"
    }
]
```

#### 404
```json
[
    {
        "message": "user not found" "||" "token not found"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```


## GET/todos/:id

get specific todo item

### parameter

| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |

### Request Headers
```
{
	"access_token": "random string token"
}
```

### Responses

#### 200
```json
{
    "project": "project 2 name",
    "todo": {
                "id": 2,
                "title": "Todo 2",
                "description": "description 2",
                "status": "not completed",
                "due_date": "2020-04-29",
                "createdAt": "2020-04-27T06:27:59.739Z",
                "updatedAt": "2020-04-27T07:48:47.349Z"
            }
}
```

#### 401
```json
[
    {
        "message": "authentication problem"
    }
]
```

#### 403
```json
[
    {
        "message": "cannot be accessed"
    }
]
```

#### 404
```json
[
    {
        "message": "user not found" "||" "token not found" "||" "todo not found"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```


## POST/todos

create new todo

### Request Headers
```
{
	"access_token": "random string token"
}
```

### Request Body
```json
{
	"title": "New Todo",
	"description": "New Description",
	"status": "not completed",
	"due_date": "2020-04-30",
    "project": "new project name"
}
```

### Responses

#### 200
```json
{
    "project": "new project name",
    "todo": {
                "id": 3,
                "title": "New Todo",
                "description": "New Description",
                "status": "not completed",
                "due_date": "2020-04-30",
                "createdAt": "2020-04-27T06:27:59.739Z",
                "updatedAt": "2020-04-27T07:48:47.349Z"
            }
}
```

#### 400
```json
[
    {
        "message": " title cannot be empty"
    },
    {
        "message": "description is null"
    },
    {
        "message": "data type invalid"
    }
]
```

#### 401
```json
[
    {
        "message": "authentication problem"
    }
]
```
#### 403
```json
[
    {
        "message": "cannot be accessed"
    }
]
```

#### 404
```json
[
    {
        "message": "user not found" "||" "token not found"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```


## PUT/todos/:id

edit todo item

### parameter

| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |


### Request Headers
```
{
	"access_token": "random string token"
}
```

### Request Body
```json
{
	"title": "Edited Todo",
	"description": "Edited Description",
	"due_date": "2020-04-30"
}
```

### Responses

#### 200
```json
{
    "message": "Todo successfully updated"
}
```

#### 400
```json
[
    {
        "message": " title cannot be empty"
    },
    {
        "message": "description is null"
    },
    {
        "message": "data type invalid"
    }
]
```

#### 401
```json
[
    {
        "message": "authentication problem"
    }
]
```

#### 403
```json
[
    {
        "message": "cannot be accessed"
    }
]
```

#### 404
```json
[
    {
        "message": "user not found" "||" "token not found" "||" "todo not found"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```


## PATCH/todos/:id

edit specific attribute of todo item

### parameter

| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |


### Request Headers
```
{
	"access_token": "random string token"
}
```

### Request Body
```json
{
    "status": "completed"
}
```

### Responses

#### 200
```json
{
    "message": "Todo successfully updated"
}
```

#### 400
```json
[
    {
        "message": " status cannot be empty" "||" "status is null"
    }
]
```

#### 401
```json
[
    {
        "message": "authentication problem"
    }
]
```

#### 403
```json
[
    {
        "message": "cannot be accessed"
    }
]
```

#### 404
```json
[
    {
        "message": "user not found" "||" "token not found" "||" "todo not found"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```


## DELETE/todos/:id

delete todo item

### parameter

| Name |        Description      |
| :--: | :---------------------: |
|  id  | Id of the specific item |


### Request Headers
```
{
	"access_token": "random string token"
}
```

### Responses

#### 200
```json
{
    "message": "Todo successfully deleted"
}
```

#### 401
```json
[
    {
        "message": "authentication problem"
    }
]
```

#### 403
```json
[
    {
        "message": "cannot be accessed"
    }
]
```

#### 404
```json
[
    {
        "message": "user not found" "||" "token not found" "||" "todo not found"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```

## POST/todos/holidays


### Request Headers
```
{
	"access_token": "random string token"
}
```
### Request Body
```json
{
    "country": "id"
}
```

### Responses

#### 200
```json
[
    {
        "name": "International Labor Day",
        "date": "2020-05-01"
    },
    {
        "name": "Waisak Day (Buddha's Anniversary)",
        "date": "2020-05-07"
    },
    {
        "name": "Ascension Day of Jesus Christ",
        "date": "2020-05-21"
    },
    {
        "name": "Cuti Bersama",
        "date": "2020-05-22"
    },
    {
        "name": "Idul Fitri Day 1",
        "date": "2020-05-24"
    },
    {
        "name": "Idul Fitri Holiday",
        "date": "2020-05-25"
    },
    {
        "name": "Cuti Bersama",
        "date": "2020-05-26"
    },
    {
        "name": "Cuti Bersama",
        "date": "2020-05-27"
    },
    {
        "name": "Eid Al Fitr Holiday",
        "date": "2020-05-28"
    },
    {
        "name": "Eid Al Fitr Holiday",
        "date": "2020-05-29"
    },
    {
        "name": "Pancasila Day",
        "date": "2020-06-01"
    },
    {
        "name": "June Solstice",
        "date": "2020-06-21T04:43:40+07:00"
    },
    {
        "name": "Eid al-Adha",
        "date": "2020-07-31"
    },
    {
        "name": "Raksha Bandhan",
        "date": "2020-08-03"
    },
    {
        "name": "Janmashtami",
        "date": "2020-08-11"
    },
    {
        "name": "Indonesian Independence Day",
        "date": "2020-08-17"
    },
    {
        "name": "Muharram / Islamic New Year",
        "date": "2020-08-20"
    },
    {
        "name": "Muharram / Islamic New Year Holiday",
        "date": "2020-08-21"
    },
    {
        "name": "Ganesh Chaturthi",
        "date": "2020-08-22"
    },
    {
        "name": "September Equinox",
        "date": "2020-09-22T20:30:39+07:00"
    },
    {
        "name": "Navaratri",
        "date": "2020-10-17"
    },
    {
        "name": "Dussehra",
        "date": "2020-10-25"
    },
    {
        "name": "The Prophet Muhammad's Birthday",
        "date": "2020-10-29"
    },
    {
        "name": "The Prophet Muhammad's Birthday Holiday",
        "date": "2020-10-30"
    },
    {
        "name": "Diwali/Deepavali",
        "date": "2020-11-14"
    },
    {
        "name": "December Solstice",
        "date": "2020-12-21T17:02:19+07:00"
    },
    {
        "name": "Cuti Bersama (Christmas Eve)",
        "date": "2020-12-24"
    },
    {
        "name": "Christmas Day",
        "date": "2020-12-25"
    },
    {
        "name": "New Year's Eve",
        "date": "2020-12-31"
    }
]
```

#### 401
```json
[
    {
        "message": "authentication problem"
    }
]
```

#### 404
```json
[
    {
        "message": "user not found" "||" "token not found" "||" "todo not found"
    }
]
```

#### 500
```json
[
    {
        "message": "internal server error"
    }
]
```
