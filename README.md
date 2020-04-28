# fancy-to-do
Create fancy to do app, using express, jquery, ajax


My Assets App Server
My Assets App is an application to manage your assets. This app has :

RESTful endpoint for asset's CRUD operation
JSON formatted response
 

RESTful endpoints

GET /assets
Get all assets

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


POST /assets
Create new asset

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



PUT /assets
Update asset by id

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

DELETE /assets
delete asset by id

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

