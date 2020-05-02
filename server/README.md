# fancy-to-do

Create fancy to do app, using express, jquery, ajax

# TODO CRUD

## 1. Show List Todo

Request Header (Get)
----

```json
{
    headers: {
        token: "token"
    }
}
```

```
http://localhost:3000/todos
```

Response (200) 
------

```json
[
  {
    "id": 9,
    "title": "crud todo",
    "description": "phase2",
    "status": "true",
    "due_date": "2020-09-09T00:00:00.000Z",
    "createdAt": "2020-04-27T13:45:18.992Z",
    "updatedAt": "2020-04-27T14:07:33.596Z"
  },
  {
    "id": 10,
    "title": "todo",
    "description": "phase2",
    "status": "true",
    "due_date": "2020-09-09T00:00:00.000Z",
    "createdAt": "2020-04-27T13:47:51.319Z",
    "updatedAt": "2020-04-27T13:47:51.319Z"
  }
]
```

Response (400)
----

```json
{
    message: "validation error || data not found"
}
```

## 2. Add Data Todo

Request Header (POST)
----

```json
{
    headers: {
        token: "token"
    }
}
```

Request Body
----
           
```json
{
    newData = {
        "title" : "<title to get insert into>",
        "description" : "<description to get insert into>",
        "status" : "<status to get insert into>",
        "due_date" : "<due_date to get insert into>",
        "UserId" : "<UserId to get insert into>",
        "createdAt" : "<createdAt to get insert into>",
        "updatedAt" : "<updatedAt to get insert into>"
    } 
}
```

Response
----

````json
{
    authorize(JSON.parse(content), res, calendarData, createEvent);
}
````

```json
{
    "id" : "<given id by system>",
    "title" : "< posted title >",
    "description" : "< posted description >",
    "status" : "< posted status>",
    "due_date" : "< posted due_date >",
    "createdAt": "2020-03-27T07:15:12.149Z",
    "updatedAt": "2020-03-27T07:15:12.149Z",
}
```

Response (400)
----

```json
{
    message: "validation error || data not found"
}
```

## 3. Get Data Todo By Id

```
http://localhost:3000/todos/:id
```

Request Header (GET)
----

```json
{
    headers: {
        token: "token"
    }
}
````

Response (200)
-----

```json
[
    {
        "id": <given id by request>,
        "title": <title todo>,
        "description": <desc todo>,
        "status": <status todo>,
        "due_date": "<due_date todo>",
        "createdAt": "2020-04-27T13:45:18.992Z",
        "updatedAt": "2020-04-27T14:07:33.596Z"
    }
]
```

Response (400)
----

```json
{
    message: `${id} not found || validation error || data not found`
}
```

## 4. Put Data Todo

```
http://localhost:3000/todos/:id
```

Request Header (GET)
----

```json
{
    headers: {
        token: "token"
    }
}
````

Request Body
----
```json
{
    "title" : "<title to get insert into>",
    "description" : "<description to get insert into>",
    "status" : "<status to get insert into>",
    "due_date" : "<due_date to get insert into>"
}
````

Response (200)
------

````json
[
    {
        "id": <given id by request>,
        "title": <title todo>,
        "description": <desc todo>,
        "status": <status todo>,
        "due_date": <due_date todo>,
        "createdAt": "2020-04-27T13:45:18.992Z",
        "updatedAt": "2020-04-27T14:07:33.596Z"
    }
]
````

Response (400)
----

```json
{
    message: `${id} not found || validation error || data not found`
}
```

## 5. Delete Data Todo

```
http://localhost:3000/todos/:id
```

Request Header (GET)
----

```json
{
    headers: {
        token: "token"
    }
}
````
Response (200)
-----
````json
{
    [
        1
    ]
}
````

Response (400)
----

```json
{
    [
        0
    ]
}

{
    message: `${id} not found || validation error || data not found`
}
```

## 6. Post Data User (Registrasi)

```
http://localhost:3000/users/registrasi
```

Request Body
----
           
```json
{
    User.create = {
        "email" : "<email to get insert into>",
        "password" : "<password to get insert into>",
    } 
}
```

Respon (201)
-----

```json
{
    
    "id": 17,
    "email": "akmalia@gmail.com",
    "password": "$2b$04$t2ZGmym5d8lV69XF6r/j.ur0ozRUe0PUyQhN3/O6XEs/sGv1LymCa",
    "updatedAt": "2020-05-02T07:22:45.804Z",
    "createdAt": "2020-05-02T07:22:45.804Z"

}
```

Respon (500)
-----

```json
{ 
    message: err.message || 'internal error server'
}
```

## 7. Post Data (Login Manual)

```
http://localhost:3000/users/login
```

Request Body
----
           
```json
{
    User.create = {
        "email" : "<email to get insert into>",
        "password" : "<password to get insert into>",
    } 

    User.findOne({
        where : {email}
    })
}
```

Response (400)
----

```json
{
    message: `${id} not found || validation error || data not found`
}
```

Response (200)
----
````json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsIngjs5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiYWttYWxpYUBnbWFpbC5jb20iLCJpYXQiyu1ODg0MDQxODR9.vmnJOZEqsU7B29NTScZVJcKc1KrY7hohCsAFCO1BkFA" "(after random)"
}
````

Response (500)
-----

```json
{ 
    message: err.message || 'internal error server'
}
```

## 8. Post Data (Login with Google)

Request Body
----
           
```javascript
{
    client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    })

    User.findOne({
        where : { email : email }
    })     
}
```

Response (200)
----

````json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsIngjs5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiYWttYWxpYUBnbWFpbC5jb20iLCJpYXQiyu1ODg0MDQxODR9.vmnJOZEqsU7B29NTScZVJcKc1KrY7hohCsAFCO1BkFA" "(after random)"
}

````
Response (500)
-----

```json
{ 
    message: err.message || 'internal error server'
}

## 9. Post Data (Logout)

Request Body
----
           
```javascript
{
    method: "POST",
    url: "http://localhost:3000/users/google-sign",
    data: { id_token : id_token }  
}
```

Response (200)
----

````javascript
{
    localStorage.setItem("access_token", data)
        $('#nav-todos').show()
        $('#nav-register').hide()
        $('#nav-login').hide()
        $('#nav-logout').show()
        $('#id_login').hide()
        $('#id_regis').hide()
        $('#getTodo').show()
        $('#addTodo').hide()
        $('#updateTodo').hide()
    })
}

````
Response (500)
-----

```javascript
{ 
    console.log(err)
}