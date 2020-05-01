# fancy-to-do
* Create fancy to do app, using express, jquery, ajax

&nbsp;

## RESTful endpoints
&nbsp;
### POST  /todos

> Create a todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>",
}
```

_Response (200 - OK)_
```
{
  "message": "A todo has been created"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid input"
}
```
---
### PUT  /todos/:id

> Edit a todo by its id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<todo title>",
  "description": "<todo description>",
  "status": "<todo status>",
  "due_date": "<todo due_date>",
}
```

_Response (200 - OK)_
```
{
  "message": "Todo ${id} has been updated"
}
```

_Response (404 - Not Found)_
```
{
  "error": "Todos id ${id} is not found"
}
```

_Response (400 - Bad Request)_
```
{
  "error": "Invalid input"
}
```
---
### GET  /todos

> Get all todos

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

_Response (200 - OK)_
```
{
  "todos": [
        {
        "id": 2,
        "title": "Puasa",
        "description": "Tidak makan dan minum dari fajar hingga terbenam matahari",
        "status": "Done",
        "due_date": null,
        "createdAt": "2020-04-27T22:15:42.862Z",
        "updatedAt": "2020-04-27T22:15:42.862Z"
        },
        {
        "id": 5,
        "title": "Puasa",
        "description": "Tidak makan dan minum dari fajar hingga terbenam matahari",
        "status": "Done",
        "due_date": "2020-05-27T17:00:00.000Z",
        "createdAt": "2020-04-27T22:22:19.971Z",
        "updatedAt": "2020-04-27T22:22:19.971Z"
        }
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "error": "Server error"
}
```
---
### GET  /todos/:id

> Get a todo by its id

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

_Response (200 - OK)_
```
{
  "id": 5,
  "title": "Puasa",
  "description": "Tidak makan dan minum dari fajar hingga terbenam matahari",
  "status": "Done",
  "due_date": "2020-05-27T17:00:00.000Z",
  "createdAt": "2020-04-27T22:22:19.971Z",
  "updatedAt": "2020-04-27T22:22:19.971Z"
}
```

_Response (404 - Not Found)_
```
{
  "error": "Todos id ${id} is not found"
}
```
---
### DELETE  /todos/:id

> Delete a todo by its id

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

_Response (200 - OK)_
```
{
  "message": "Todos id ${id} has been deleted"
}
```

_Response (404 - Not Found)_
```
{
  "error": "Todos id ${id} is not found"
}
```
---
### SIGNUP  /user/signup

> Sign up / create an user account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": <your name: string>,
  "email": <your email: string>,
  "password": <your password: string>
}
```

_Response (201 - Created)_
```
{
  "id": <your id: number>,
  "email": <your email: string>,
  "password": <your password: hashed string>
}
```

_Response (404 - Not Found)_
```
{
  "error": "Todos id ${id} is not found"
}
```
