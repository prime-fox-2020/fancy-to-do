# fancy-to-do
Create fancy to do app, using express, jquery, ajax
My List is a Todo Application using a RESTful, has CRUD operations.

JSON formatted response
RESTful endpoints
GET /todos

Get all todos
Request Header{
  "access_token": "<your access_token>"
}
Request Body
not needed

Response (200)[
  {
    "id": 1,
    "name": "<asset name>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>",
    "UserId": "<asset UserId>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
Response (400 - Bad Request){
  "message": "<returned error message>"
}

POST /todos

Create new todos
Request Header{
  "access_token": "<your access_token>"
}
Request Body{
    "name": "<asset name>",
    "description": "<description description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>"
}
Response (201 - Created){
    "id": <given id by system>,
    "name": "<posted name>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>"
    "UserId": "<posted UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response (400 - Bad Request){
  "message": "<returned error message>"
}

PUT /todos/:id
Update todos by id
Request Header{
  "access_token": "<your access_token>"
}
Request Body to update{
    "name": "<asset name>",
    "description": "<description description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>"
}
Response (201 - Created){
    "id": <given id by system>,
    "name": "<posted name>",
    "description": "<posted description>",
    "status": "<posted status>",
    "due_date": "<posted due_date>"
    "UserId": "<posted UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response (400 - Bad Request){
  "message": "<returned error message>"
}

DELETE /todos/:id
delete todos by id
Request Header{
  "access_token": "<your access_token>"
}
Request Body to delete
not needed

Response (201 - deleted) all assets except the one that has been deleted

Response (400 - Bad Request){
  "message": "<returned error message>"
}

RESTful endpoint for User's CRUD operation
JSON formatted response
POST /user/register

POST User to register
Request Header
not needed

Request Body{
    "email": "<asset email>",
    "password": "<asset password>"
}
Response (201)[
  {
    "id": 1,
    "name": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
Response (400 - Bad Request){
  "message": "<returned error message>"
}
POST /user/ogin

POST User to login
Request Header
not needed

Request Body{
    "email": "<asset email>",
    "password": "<asset password>",
}
Response (200)[
  {
    "access_token": "<your access_token>"
  }
]
Response (400 - Bad Request){
  "message": "<returned error message>"
}
