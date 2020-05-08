# Fancy-To-Do
Create fancy to do app, using express, jquery, ajax.\
My assets in App is an application to manage your assets.\
This app has :
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
<br></br>
--------------------------
## RESTful endpoints
* Route todos
* Route User
<br></br>
-------------------------
# Route todos
### GET / todos
> Get all todos list
>
*Request Header*
```
{
  "access_token": "<your access token>"
}
```
*Request Body*
```
not needed
```
*Respons (200)*
```
[
  {
    "id": 1,
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>",
    "description": "<asset description>",
    "UserId": "<asset user id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>",
    "description": "<asset description>",
    "UserId": "<asset user id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```
*Responses Error(404-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Responses Error(500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### POST / todos
> Create todo
>
*Request Header*
```
{
  "access_token": "<your access token>"
}
```
*Request Body*
```
{
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>"
}
```
*Respons (201)*
```
{
  "message": "<returned success message>"
}
```
*Respons (400-Error validate)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### GET / todos/:id
> Get todo with id
>
*Request Header*
```
{
  "access_token": "<your access token>"
}
```
*Request Params*
```
{
    "id": "<asset params id>",
}
```
*Respons (200)*
Get todo with id = 2 with access token

```
{
    "id": 2,
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>",
    "description": "<asset description>",
    "UserId": "<asset user id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

```
*Respons (404- bad request)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### PUT / todos/:id
> Update todo with id params
>
*Request Header*
```
{
  "access_token": "<your access token>"
}
```
*Request Params*
```
{
    "id": "<asset params id>",
}
```
*Request Body*
```
{
    "title": "<asset title>",
    "description": "<asset description>",
    "status": "<asset status>",
    "due_date": "<asset due_date>"
    "UserId": "<asset user id>"
}
```
*Respons (200)*
```
  "message": "<returned success message>"
```
*Respons (404- bad request)*
```
{
  "message": "<returned error message>"
}
```
*Respons (400-error validation)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### DELETE / todos/:id
> Delete todo with id params
>
*Request Header*
```
{
  "access_token": "<your access token>"
}
```
*Request Params*
```
{
    "id": "<asset params id>",
}
```
*Respons (200)*
```
  "message": "<returned success message>"
```
*Respons (404- bad request)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>

------------------------------------
# Route Users
### POST /users/register
> Create user
>
*Request Body*
```
{
    "username": "<asset username>",
    "email": "<asset email>",
    "password": "<asset password>"
}
```
*Respons (201)*
```
  "message": "<returned success message>"
```
*Respons (400-error validation)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>
### POST /users/login
> Enter account user
>
*Request Body*
```
{
    "email": "<asset email>",
    "password": "<asset password>"
}
```
*Respons (200)*
```
  "akses_token": "<returned akses_token>"
```
*Respons (400-bad request)*
```
{
  "message": "<returned error message>"
}
```
*Respons (500-error server)*
```
{
  "message": "<returned error message>"
}
```
<br></br>