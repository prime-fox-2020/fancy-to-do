# fancy-to-do
Fancy To Do App is an application to manage your To Do list. This app use : 
* express
* jquery
* ajax


&nbsp;
**Add Todo**
----
  Add single todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**


* **Data Body**

   **Required:**`{
    "id": "<created by system>",
    "name": "<from req.body.name>",
    "description": "<from req.body.description>",
    "status": "<from req.body.status>",
    "due_date": "<from req.body.due_date>"
    "createdAt": "<created by system>",
    "updatedAt": "<created by system>"
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "name": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }`
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ error : "validation error" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error message" }`


&nbsp;
**Show All Todo**
----
  Returns json data about all todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "name": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  },
  {
    "id": 2,
    "name": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error message" }`


&nbsp;
**Show Todo**
----
  Returns json data about a single todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "name": "<todo name>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todo doesn't exist" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error message" }`


&nbsp;
**Update Todo**
----
  Update single todo.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

* **Data Params**

  **Required:**
 
   `id=[integer]`

* **Data Body**

   **Required:**`{
    "id": "<created by system>",
    "name": "<from req.body.name>",
    "description": "<from req.body.description>",
    "status": "<from req.body.status>",
    "due_date": "<from req.body.due_date>"
    "createdAt": "<created by system>",
    "updatedAt": "<created by system>"
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "name": "<updated todo name>",
    "description": "<updated todo description>",
    "status": "<updated todo status>",
    "due_date": "<updated todo due date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }`
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ error : "validation error" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todo doesn't exist" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error message" }`


&nbsp;
**Delete Todo**
----
  Delete single todo.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

* **Data Params**

  **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 1,
    "name": "<deleted todo name>",
    "description": "<deleted todo description>",
    "status": "<deleted todo status>",
    "due_date": "<deleted todo due date>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Todo doesn't exist" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error message" }`