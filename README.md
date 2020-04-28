<!-- # fancy-to-do
Create fancy to do app, using express, jquery, ajax -->

FANCY TO DO APP

This app helps you by listing your daily activities.
THe app has:
- RESTful endpoints for to do activities' CRUD operation
- JSON formatted response

RESTful Endpoints

GET

GET/todos
Gets all activities from the to do list

-> Request Params:
Not needed

-> Request Body:
Not needed

-> Response (200):
[
    {
        "id": 1,
        "title": "<to do title>",
        "description": "<to do description>",
        "status": "<to do status>",
        "due_date": "<to do due_date>",
        "createdAt": "<to do created date>",
        "updatedAt": "<to do updated date>"
    },
    {
        "id": 2,
        "title": "<to do title>",
        "description": "<to do description>",
        "status": "<to do status>",
        "due_date": "<to do due_date>",
        "createdAt": "<to do created date>",
        "updatedAt": "<to do updated date>"
    }
]

-> Response (500):
{
    <error data>
}

GET/todos/:id
Gets a certain activity by to do id

-> Request Params:
{
    "id": <to do id number>
}

-> Request Body:
Not needed

-> Response (200):
[
    {
        "id": "<to do id number as requested by params>",
        "title": "<to do title>",
        "description": "<to do description>",
        "status": "<to do status>",
        "due_date": "<to do due_date>",
        "createdAt": "<to do created date>",
        "updatedAt": "<to do updated date>"
    }
]

-> Response (404):
{
    <error data>
}

POST

POST/todos
Adds an activity to the to do list

-> Request Params:
Not needed

-> Request Body:
[
    {
        "title": "<new to do title>",
        "description": "<new to do description>",
        "status": "<new to do status>",
        "due_date": "<new to do due_date>"
    }
]

-> Response (201):
[
    {
        "id": "<new to do id number>",
        "title": "<new to do title>",
        "description": "<new to do description>",
        "status": "<new to do status>",
        "due_date": "<new to do due_date>",
        "createdAt": "<new to do created date>",
        "updatedAt": "<new to do updated date>"
    }
]

-> Response (500):
{
    <error data>
}

PUT

PUT/todos/:id
Edits a certain activity in the to do list

-> Request Params:
{
    "id": <to do id number>
}

-> Request Body:
[
    {
        "title": "<new to do title>",
        "description": "<new to do description>",
        "status": "<new to do status>",
        "due_date": "<new to do due_date>"
    }
]

-> Response (200):
{
    "message": "data successfully updated"
}

-> Response (404):
{
    "message": "data not found"
}

DELETE

DELETE/todos/:id
Deletes a certain activity from the to do list

-> Request Params:
{
    "id": <to do id number>
}

-> Request Body:
Not needed

-> Response (200):
{
    "message": "data successfully deleted"
}

-> Response (500):
{
    <error data>
}