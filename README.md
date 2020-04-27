# fancy-to-do
Fancy To Do App is an application to manage your To Do list. This app use : 
* express
* jquery
* ajax

&nbsp;
**Show User**
----
  Returns json data about a single user.

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
    **Content:** `{ message : "Todo doesn't exist" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error message" }`