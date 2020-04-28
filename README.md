# fancy-to-do
Create fancy to do app, using express, jquery, ajax
GET /assets
Get all assets

Request Header

Request Body

Response (200)

[
    {
        "id": 4,
        "title": "Learn REST API",
        "description": "Learn how to create RESTful API with Express and Sequelize",
        "status": null,
        "due_date": "2020-03-28",
        "createdAt": "2020-04-27T13:32:16.850Z",
        "updatedAt": "2020-04-27T13:32:16.850Z"
    },
    {
        "id": 3,
        "title": "Learn REST API",
        "description": "Learn how to create RESTful API with Express and Sequelize",
        "status": null,
        "due_date": "2020-03-28",
        "createdAt": "2020-04-27T13:14:07.114Z",
        "updatedAt": "2020-04-27T13:32:47.847Z"
    }
]
Response (400 - Bad Request)

{
  "message": "Not Found"
}

POST /assets
Create new asset

Response (201 - Created)

{
    "id": 4,
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "status": null,
    "due_date": "2020-03-28",
    "createdAt": "2020-04-27T13:32:16.850Z",
    "updatedAt": "2020-04-27T13:32:16.850Z"
}
Response (400 - Bad Request)

{
  "message": err
}

POST register
request body
{
    "email": "getar@email.com",
    "password": 12345
}

response
201
{
    "id": 1,
    "name": null,
    "email": "getar@email.com",
    "password": "$2a$04$.cwWhoWX.N6irdV9QKny2eji3J7f9X1cGqIzXrjZpdWMhqX3m6J/y"
}

400
{
    "errorCode": "VALIDATION_ERROR",
    "message": "Data harus lengkap"
}

{
    "errorCode": "IEMAIL_ALREADY_USED",
    "message": "Email already used"
}


POST Login
Request Body
{
    "email": "getar@email.com",
    "password": 12345
}

Response
201
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnZXRhckBlbWFpbC5jb20iLCJpYXQiOjE1ODgwODI2NjB9.VENBj0hSxby8IPN0UO5N37ZzpI7eTBlFIQLyyln1-9w"
}

400
{
    "errorCode": "INVALID_EMAIL_PASSWORD",
    "message": "Invalid Email / Password"
}