# fancy-to-do
Create fancy to do app, using express, jquery, ajax

## RESTful Endpoints

### GET /todo
> Get all todo in list

_Request Header_
```
{
    "access_token" = "<your access token>"
}
```

_Request Body_
```
Not Needed
```

_Response (200)_
```
[
    {
        "id" : 1,
        "title" : <your todo name>,
        "description" : <your todo description>,
        "status" : <your todo status>,
        "due_date" : <your todo due_date>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    },
    {
        "id" : 2,
        "title" : <your todo name>,
        "description" : <your todo description>,
        "status" : <your todo status>,
        "due_date" : <your todo due_date>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```
_Response (500)_
```
{
    "message" : "<error message>"
}
```

### POST /todo
> Create new todo

_Request Header_
```
{
    "access_token" = "<your access token>"
}
```

_Request Body_
```
{
    "title" : <title to get insert into>,
    "description" : <description to get insert into>,
    "due_date" : <date to get insert into>,
}
```

_Response (201 - created)_
```
[
    {
        "id" : <given by sistem>,
        "title" : <posted title>,
        "description" : <posted description>,
        "status" : <default status value is false>,
        "due_date" : <posted date>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```

_Response (400 - Bad Request)_
```
{
    "message" : "<error message>"
}
```

| Title            | Get all Todo List                                                                                                               |   |
|------------------|---------------------------------------------------------------------------------------------------------------------------------|---|
| URL              | /todo                                                                                                                           |   |
| Method           | GET                                                                                                                             |   |
| URL Parameter    | -                                                                                                                               |   |
| Success Response | Code:200 Content: {            id:  <br>          title:    <br>        description:    <br>        status: <br>           due_date: <br>         } |   |
| Error Response   |  Code: 500 Content: { "message" : "error message"}                                                                              |   |
| Error Response   |                                                                                                                                 |   |
|  

### GET /todo/:id
> Get todo from certain id

_Request Header_
```
{
    "access_token" = "<your access token>"
}
```

_Request Body_
```
{
    "id" : <your designated id todo>
}
```

_Response (200)_
```
[
    {
        "id" : <your given id>,
        "title" : <your todo name based on id>,
        "description" : <your todo description based on id>,
        "status" : <your todo status based on id>,
        "due_date" : <your todo due_date based on id>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```

_Response (404)_
```
{
    "message" : "<data not found>"
}
```

_Response (500)_
```
{
    "message" : "<error message>"
}
```

### PUT /todo/:id
> Edit todo from certain id

_Request Header_
```
{
    "access_token" = "<your access token>"
}
```

_Request Body_
```
{
    "id" : <your designated id todo>,
    "title" : <edited title>,
    "description" : <edited description>,
    "due_date" : <edited date>,
}
```

_Response (200)_
```
[
    {
        "id" : <your given id>,
        "title" : <your edited todo name based on id>,
        "description" : <your edited todo description based on id>,
        "status" : <your todo status based on id>,
        "due_date" : <your edited todo due_date based on id>,
        "createdAt" : "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
```

_Response (404)_
```
{
    "message" : "<data not found>"
}
```

_Response (500)_
```
{
    "message" : "<error message>"
}
```

### DELETE /todo/:id
> Delete todo from certain id

_Request Header_
```
{
    "access_token" = "<your access token>"
}
```

_Request Body_
```
{
    "id" : <your designated id todo>,
}
```

_Response (200)_
```
[
    {
        "message" : "data has been deleted"
    }
]
```

_Response (404)_
```
{
    "message" : "<data not found>"
}
```

_Response (500)_
```
{
    "message" : "<error message>"
}
```

