# fancy-to-do
Create fancy to do app, using express, jquery, ajax


My Assets App Server
My Assets App is an application to manage your assets. This app has :

RESTful endpoint for todos's CRUD operation
JSON formatted response
 

RESTful endpoints

GET /todos
Get all todos

Request Header

{
  "access_token": "<your access token>"
}

Request Body

not needed
Response (200)

[
  {
    "id": 1,
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
Response (400 - Bad Request)

{
  "message": "<returned error message>"
}


POST /todos
Create new todos

Request Header

{
  "access_token": "<your access token>"
}

Request Body

{
    "title": "<asset title>",
    "description": "<description to get insert into>",
    "status": "<asset status>",
    "due_date": "<asset due_date>",
}

Response (201 - Created)

{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

Response (400 - Bad Request)

{
  "message": "<returned error message>"
}



PUT /todos
Update todos by id

Request Header

{
  "access_token": "<your access token>"
}


Request Body to update

{
    "title": "<change your title>",
    "description": "<change your description>",
    "status": "<change your status>",
    "due_date": "<change your due_date>",
}

Response (201 - Created)

{
  "title": "<updated title>",
    "description": "<updated your description>",
    "status": "<updated your status>",
    "due_date": "<updated your due_date>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response (400 - Bad Request)

{
  "message": "<returned error message>"
}

DELETE /todos
delete todos by id

Request Header

{
  "access_token": "<your access token>"
}


Request Body to delete

not needed


Response (201 - deleted)

all assets except the one that has been deleted

Response (400 - Bad Request)

{
  "message": "<returned error message>"
}

RESTful endpoint for users's CRUD operation
JSON formatted response

GET /users
Get all users

Request Header

{
  "access_token": "<your access token>"
}

Request Body

not needed
Response (200)

[
  {
    "id": 1,
    "name": "<asset name>",
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<asset name>",
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
  
]
Response (400 - Bad Request)

{
  "message": "<returned error message>"
}


POST /users/register
POST users to register

Request Header

{
  "access_token": "<your access token>"
}

Request Body

{
    "name": "<asset name>",
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
}

Response (200)

[
  {
    "id": 1,
    "name": "<asset name>",
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<asset name>",
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
  
]
Response (400 - Bad Request)

{
  "message": "<returned error message>"
}

POST /users/login
POST users to login

Request Header

{
  "access_token": "<your access token>"
}

Request Body

{
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
}

Response (200)

[
  {
    "id": 1,
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
  
]
Response (400 - Bad Request)

{
  "message": "<returned error message>"
}

POST /users/google-login
POST users to google-login

Request Header

{
  "access_token": "<your access token>",
  "google_token": "<your access google token>"
}

Request Body

{
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
}

Response (200)

[
  {
    "id": 1,
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
  
]
Response (400 - Bad Request)

{
  "message": "<returned error message>"
}


DELETE /users/:id
delete users by id

Request Header

{
  "access_token": "<your access token>"
}


Request Body to delete

not needed


Response (201 - deleted)

all assets except the one that has been deleted

Response (400 - Bad Request)

{
  "message": "<returned error message>"
}


GET /holidays
Get all 3rd party holidays calendar

Request Header

{
  "access_token": "<your access token>", 
}

Request Params 

{
  'api_key': '<your api key>',
  'country': '<country id>',
  'year': <year in number>
}

Request Body

not needed
Response (200)

[
  {
    "name": "<asset name of holidays>",
    "description": "<asset holidays description>",
    "country": "<asset country name>",
    "date": "<asset date of holiday>",
  }
]
Response (400 - Bad Request)

{
  "message": "<returned error message>"
}