# fancy-to-do
Create fancy to do app, using express, jquery, ajax

=> Get 
---> Request Header
    {
        get all Todos
    }
---> Request Body
    not needed
---> Response (200)
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
--> Response (400)


=> Post 
---> Request Header

---> Request Body
    {
        "title" : "<title to get insert into>",
        "description : "<description to get insert into>"
        "status" : "<status to get insert into>"
        "due_date" : "<due_date to get insert into>"
    }
---> Response (201)
     {
        "id" : <given id by system>,
        "title" : "< posted title >",
        "description : "< posted description >",
        "status" : "< posted status>",
        "due_date" : "< posted due_date >",
        "createdAt": "2020-03-27T07:15:12.149Z",
        "updatedAt": "2020-03-27T07:15:12.149Z",
    }
--> Response (400)
    {message : 'invalid input'}

=> Get/todos /:id
---> Request Header
    {
        get todos by id
    }
---> Request Body
    not needed
---> Response (200)
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
--> Response (400)
    {
        {message: `id ${id} not found`}
    }

=>Put /todos/:id
---> Request Header
    {
        update data by id
    }
---> Request Body
    {
        "title" : "<title to get insert into>",
        "description : "<description to get insert into>"
        "status" : "<status to get insert into>"
        "due_date" : "<due_date to get insert into>"
    }
---> Response (200)
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
--> Response (400)
    {
        {message: `id ${id} not found`}
    }

=>delete /todos/:id
---> Request Header
    
---> Request Body
   
---> Response (200)
    [
       1 
    ]
--> Response (400)
    {
        {message: `id ${id} not found`}
    }



