const url = 'http://localhost:3000'
let todos = []

$(document).ready(()=> {

    $("section").hide()
    $(".form-container").hide()
    if(!localStorage.getItem("access_token")){
        $(".home").show()
        $(".logoutBtn").hide()
    } else {
        $(".home").hide()
        $(".logoutBtn").show()
        $(".user-page").show()
        $(".todo-detail").hide()
        getTodo()
    }

    $(".registerBtn").click(e => {
        e.preventDefault()
        $(".home").hide()
        $(".form-register").show()
    })
    $(".loginBtn").click(e => {
        e.preventDefault()
        $(".home").hide()
        $(".form-login").show()
    })
    $(".cancelBtn").click(()=> {
        $(".form-register").hide()
        $(".form-login").hide()
        $(".home").show()
    })
    $(".logoutBtn").click(e => {
        e.preventDefault()
        localStorage.removeItem("access_token")
        $(".user-page").hide()
        $(".form-container").hide()
        $(".home").show()
        $(".todo-item").remove()
        signOut()
    })
    $(".addBtn").click(e => {
        e.preventDefault()
        $(".todo-list").hide()
        $(".form-create").show()
    })
    $(".backBtn").click(e => {
        e.preventDefault()
        $(".todo-list").show()
        $(".item-detail").remove()
        $(".todo-detail").hide()
        $(".form-create").hide()
        $(".form-update").hide()
    })

    $("#form-register").submit(e => {
        e.preventDefault()
        const email = $("#regEmail").val()
        const password = $("#regPassword").val()
        $.ajax({
            url: `${url}/register`,
            type: "POST",
            data: {
                email,
                password
            }
        }).done(response => {
            localStorage.setItem('access_token', response.access_token)
            $(".home").hide()
            $(".form-container").hide()
            $(".logoutBtn").show()
            $(".user-page").show()
            $(".todo-detail").hide()
            $("#regEmail").val('')
            $("#regPassword").val('')
            getTodo()
        }).fail(err => {
            console.log(err)
        })
    })
    $("#form-login").submit(e => {
        e.preventDefault()
        const email = $("#logEmail").val()
        const password = $("#logPassword").val()
        $.ajax({
            url: `${url}/login`,
            type: "POST",
            data: {
                email,
                password
            }
        }).done(response => {
            localStorage.setItem('access_token', response.access_token)
            $(".home").hide()
            $(".form-container").hide()
            $(".logoutBtn").show()
            $(".user-page").show()
            $(".todo-detail").hide()
            $("#logEmail").val('')
            $("#logPassword").val('')
            getTodo()
        }).fail(err => {
            console.log(err)
        })
    })
    $("#form-create").submit(e => {
        e.preventDefault()
        const title = $("#todoTitle").val()
        const description = $("#todoDescription").val()
        const due_date = $("#todoDueDate").val()
        let inputData = {title, description, due_date}
        $.ajax({
            url:`${url}/todos`,
            type: "POST",
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: inputData
        }).done(todo => {
            todos.push(todo)
            appendTodos(todo, ".todos-table")
            $(".form-container").hide()
            $(".todo-list").show()
            $("#todoTitle").val('')
            $("#todoDescription").val('')
            $("#todoDueDate").val('')
        }).fail(err => {
            console.log(err)
        })
    })
})

function appendTodos(obj, element) {
    let checkBtn = null
    for(let i = 0; i < todos.length; i++){
        if(todos[i].id === obj.id){
            if (todos[i].status === "not completed") {
                checkBtn = `<button onClick="checking(${obj.id})" class="btn btn-outline-success">done</button>`
            } else {
                checkBtn = `<button onClick="checking(${obj.id})" class="btn btn-success">revert</button>`
            }
            break
        }
    }
    $(element)
    .append(`<tr class="todo-item">
                <td>${obj.title}</td>
                <td>${obj.status}</td>
                <td>
                ${checkBtn}
                <button onClick="todoDetail(${obj.id})" class="btn btn-outline-primary">view detail</button>
                <button onClick="confirmDelete(${obj.id})" class="btn btn-danger">delete</button>
                </td>
            </tr>`)
}

function appendTodo(obj, element) {
    $(element)
    .append(`<tr class="item-detail">
            <td>${obj.title}</td>
            <td>${obj.description}</td>
            <td>${obj.status}</td>
            <td>${obj.due_date}</td>
            <td>
                <button onClick="edit(${obj.id})" class="btn btn-outline-primary">edit</button>
                <button onClick="confirmDelete(${obj.id})" class="btn btn-danger">delete</button>
            </td>
        </tr>`)
}

function getTodo() {
    $.ajax({
        url: `${url}/todos`,
        type: "GET",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    }).done(response => {
        todos = response
        if(todos.length > 0){
            todos.forEach(todo => {
                appendTodos(todo, ".todos-table")
            })
        }
    }).fail(err => {
        console.log(err)
    })
}

function checking(id) {
    let complete = false
    for(let i = 0; i < todos.length; i++){
        if(todos[i].id === id){
            todos[i].status === "completed" ? complete = true : complete = false
            break
        }
    }
    if(!complete){
        $.ajax({
            url:`${url}/todos/${id}`,
            type: "PATCH",
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: {
                status: "completed"
            }
        })
        .done(response => {
            $(".todo-item").remove()
            todos.forEach(todo => {
                if(todo.id === id){
                    todo.status = "completed"
                }
                appendTodos(todo, ".todos-table")
            })
        })
        .fail(err=>{
            console.log(err)
        })
    } else {
        $.ajax({
            url:`${url}/todos/${id}`,
            type: "PATCH",
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: {
                status: "not completed"
            }
        })
        .done(response => {
            $(".todo-item").remove()
            todos.forEach(todo => {
                if(todo.id === id){
                    todo.status = "not completed"
                }
                appendTodos(todo, ".todos-table")
            })
        })
        .fail(err=>{
            console.log(err)
        })
    }
}

function todoDetail(id) {
    $(".todo-list").hide()
    $(".todo-detail").show()
    for(let i = 0; i < todos.length; i++){
        if(todos[i].id === id){
            appendTodo(todos[i], ".todo-table")
            break
        }
    }
}

function edit(id) {
    $(".todo-detail").hide()
    $(".form-update").show()
    let index = null
    for(let i = 0; i < todos.length; i++){
        if(todos[i].id === id){
            $("#updateTitle").val(todos[i].title)
            $("#updateDescription").val(todos[i].description)
            $("#updateDueDate").val(todos[i].due_date)
            index = i
            break
        }
    }
    $("#form-update").submit(function(e){
        e.preventDefault()
        const title = $("#updateTitle").val()
        const description = $("#updateDescription").val()
        const due_date = $("#updateDueDate").val()
        let inputData = {title, description, due_date}
        todos[index].title = title
        todos[index].description = description
        todos[index].due_date = due_date
        $.ajax({
            url:`${url}/todos/${id}`,
            type: "PUT",
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: inputData
        }).done(response => {
            $(".form-update").hide()
            $(".todo-list").show()
            $(".item-detail").remove()
            $(".todo-item").remove()
            todos.forEach(todo => {
                appendTodos(todo, ".todos-table")
            })
        }).fail(err =>{
            console.log(err)
        })
    })
}

function confirmDelete(id) {
    $(".message").append(`
        <div class="alert alert-danger">
            are you sure want to delete?
            <div class="choice">
                <a onClick="deleteTodo(${id})" style="cursor: pointer;">Yes</a>
                <a onClick="cancelDelete()" style="cursor: pointer;">No</a>
            </div>
        </div>
    `)
}

function deleteTodo(id) {
    $.ajax({
        url:`${url}/todos/${id}`,
        type: "DELETE",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    }).done(response => {
        $(".alert").remove()
        $(".todo-detail").hide()
        $(".todo-list").show()
        let index = null
        for(let i = 0; i < todos.length; i++){
            if(todos[i].id === id){
                index = i
                break
            }
        }
        todos.splice(index, 1)
        $(".todo-item").remove()
        todos.forEach(todo => {
            appendTodos(todo, ".todos-table")
        })
    }).fail(err => {
        console.log(err)
    })
}

function cancelDelete(){
    $(".alert").remove()
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url:`${url}/googleSign`,
        method:"POST",
        data: { id_token }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        $(".home").hide()
        $(".form-container").hide()
        $(".logoutBtn").show()
        $(".user-page").show()
        $(".todo-detail").hide()
    })
    .fail(err=>{
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('access_token')
    });
    $(".logoutBtn").hide()
  }