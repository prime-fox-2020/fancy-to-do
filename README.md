# fancy-to-do
Create fancy to do app, using express, jquery, ajax

## REST endpoint
- [POST/ register](#postregister)
- [POST/ login](#postlogin)
- [GET/ todos](#gettodos)
- [GET/ todos/:id](#gettodosid)
- [POST/ todos](#posttodos)
- [PUT/ todos/:id](#puttodosid)
- [PATCH/ todos/:id](#patchtodosid)
- [DELETE/ todos/:id](#deletetodosid)


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
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU4Nzk5ODg0OX0.gbv3on6pLM7r9-yxX4E4A4nu1riGImmaCNAQvhxNFIY"
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


## GET/todos
get list of all todos

### Request Headers
```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU4Nzk5ODg0OX0.gbv3on6pLM7r9-yxX4E4A4nu1riGImmaCNAQvhxNFIY"
}
```
### Response

#### 200
```json
[
    {
        "id": 1,
        "title": "Todo 1",
        "description": "description 1",
        "status": "not completed",
        "due_date": "2020-04-27",
        "createdAt": "2020-04-27T06:27:59.739Z",
        "updatedAt": "2020-04-27T07:48:47.349Z"
    },
    {
        "id": 2,
        "title": "Todo 2",
        "description": "description 2",
        "status": "not completed",
        "due_date": "2020-04-29",
        "createdAt": "2020-04-27T06:27:59.739Z",
        "updatedAt": "2020-04-27T07:48:47.349Z"
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
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU4Nzk5ODg0OX0.gbv3on6pLM7r9-yxX4E4A4nu1riGImmaCNAQvhxNFIY"
}
```

### Responses

#### 200
```json
{
    "id": 2,
    "title": "Todo 2",
    "description": "description 2",
    "status": "not completed",
    "due_date": "2020-04-29",
    "createdAt": "2020-04-27T06:27:59.739Z",
    "updatedAt": "2020-04-27T07:48:47.349Z"
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
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU4Nzk5ODg0OX0.gbv3on6pLM7r9-yxX4E4A4nu1riGImmaCNAQvhxNFIY"
}
```

### Request Body
```json
{
	"title": "New Todo",
	"description": "New Description",
	"status": "not completed",
	"due_date": "2020-04-30"
}
```

### Responses

#### 200
```json
{
    "id": 2,
    "title": "New Todo",
    "description": "New Description",
    "status": "not completed",
    "due_date": "2020-04-30",
    "createdAt": "2020-04-27T06:27:59.739Z",
    "updatedAt": "2020-04-27T07:48:47.349Z"
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
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU4Nzk5ODg0OX0.gbv3on6pLM7r9-yxX4E4A4nu1riGImmaCNAQvhxNFIY"
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
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU4Nzk5ODg0OX0.gbv3on6pLM7r9-yxX4E4A4nu1riGImmaCNAQvhxNFIY"
}
```

### Request Body
```json
{
    status: "completed"
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
        "message": " status cannot be empty"
    },
    {
        "message": "status is null"
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
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU4Nzk5ODg0OX0.gbv3on6pLM7r9-yxX4E4A4nu1riGImmaCNAQvhxNFIY"
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