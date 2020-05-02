# fancy-to-do
Create fancy to do app, using express, jquery, ajax

## Endpoints
### GET/todos
_Get all Todo, created by the user logged in_ 
#### Request Header
    {
       "Content-Type": "application/x-www-form-urlencoded"
       "access-token" : "your access_token"
    }

#### Request Body      
  None
#### Response(200)
> [
>   {
        "id": 14,
        "title": "clean bathroom",
        "description": "clean the bathroom in first floor",
        "status": true,
        "due_date": "2020-04-29T00:00:00.000Z",
        "createdAt": "2020-04-28T10:52:47.613Z",
        "updatedAt": "2020-04-28T10:52:47.613Z",
        "UserId": "3"
    },
    {
        "id": 16,
        "title": "make lunch",
        "description": "cook lunch for 3 ppl",
        "status": false,
        "due_date": "2020-04-30T00:00:00.000Z",
        "createdAt": "2020-04-28T11:00:29.591Z",
        "updatedAt": "2020-04-28T11:00:29.591Z",
        "UserId": "3"
    },
    {
        "id": 17,
        "title": "make lunch",
        "description": "cook lunch for 3 ppl",
        "status": false,
        "due_date": "2020-04-30T00:00:00.000Z",
        "createdAt": "2020-04-28T11:11:45.780Z",
        "updatedAt": "2020-04-28T11:11:45.780Z",
        "UserId": "3"
    }
> ]

#### Response(500)
> {
    "errorMessage": "Unknown Error"
> }


### POST/todos
> Create a New Todo
- Request Headers 
    {
        "Content-Type": "application/x-www-form-urlencoded"
        "access-token" : "your access token"
    }
- Request Body
{
    "title" : "buy milk"
    "description" : "buy milk to make cake"
    "status" : "false"
    "due_date" : "2020-08-04"
}
- Response(200)
{
    "id": 19,
    "title": "buy milk",
    "description": "buy milk to make cake",
    "status": true,
    "due_date": "2020-08-04T00:00:00.000Z",
    "UserId": "3",
    "updatedAt": "2020-04-28T14:11:14.882Z",
    "createdAt": "2020-04-28T14:11:14.882Z"
}
- Response(500)
{
    "errorMessage": "Unknown Error"
}
- Response(404)
{
    "errorMessage": "Data not Found"
}

- Response(400)
{
    "errorMessage": "Validation Error"
}

###  GET/todos/:id
> Get a specific Todo by ID , created by the user that's logged in.
- Request Headers
    {
        "Content-Type": "application/x-www-form-urlencoded"
        "access-token" : "your access token"
    }
- Request Body
  None

- Response(200)
{
    "id": 16,
    "title": "make lunch",
    "description": "cook lunch for 3 ppl",
    "status": false,
    "due_date": "2020-04-30T00:00:00.000Z",
    "createdAt": "2020-04-28T11:00:29.591Z",
    "updatedAt": "2020-04-28T11:00:29.591Z",
    "UserId": "3"
}
- Response(500)
{
    "errorMessage": "Unknown Error"
}
- Response(404)
{
    "errorMessage": "Data not Found"
}



### POST/todos/:id
> Edit a specific todo by id 
- Request Headers 
    {
        "Content-Type": "application/x-www-form-urlencoded"
        "access-token" : "your access token"
    }

- Request Body
{
    "title" : "buy milk"
    "description" : "buy milk to make cake"
    "status" : "true"
    "due_date" : "2020-08-04"
}
- Response (200)
[
    1
]
- Response (500)
{
    "errorMessage": "Unknown Error"
}
- Response(404)
{
    "errorMessage": "Data not Found"
}

- Response(400)
{
    "errorMessage": "Validation Error"
}
### DELETE/todos/:id
> Delete a specific todo
- Request Headers 
    {
        "Content-Type": "application/x-www-form-urlencoded"
        "access-token" : "your access token"
    }

- Request Body
  None

- Response(200)
[
    1
]
- Response(500)
{
    "errorMessage": "Unknown Error"
}
- Response(404)
{
    "errorMessage": "Data not Found"
}
