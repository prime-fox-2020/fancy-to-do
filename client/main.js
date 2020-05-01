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
        $(".holiday-list").hide()
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
        fb_logout()
        signOut()
    })
    $(".addBtn").click(e => {
        e.preventDefault()
        $(".todo-list").hide()
        $(".form-create").show()
        getProjects()
    })
    $(".projectBtn").click(e => {
        e.preventDefault()
        $(".todo-list").hide()
        $(".form-project").show()
        getMembers()
    })
    $(".backBtn").click(e => {
        e.preventDefault()
        $(".todo-list").show()
        $(".item-detail").remove()
        $(".holiday-item").remove()
        $(".todo-detail").hide()
        $(".holiday-list").hide()
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
        const project = $("#project").val()
        let inputData = {title, description, due_date, project}
        $.ajax({
            url:`${url}/todos`,
            type: "POST",
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: inputData
        }).done(Todo => {
            todos.push(Todo)
            appendTodos(Todo, ".todos-table")
            $(".form-container").hide()
            $(".todo-list").show()
            $(".project-value").remove()
            $("#todoTitle").val('')
            $("#todoDescription").val('')
            $("#todoDueDate").val('')
        }).fail(err => {
            console.log(err)
        })
    })
    $("#form-project").submit(e => {
        e.preventDefault()
        const name = $("#projectName").val()
        const membersId = members
        let inputData = {name, membersId}
        $.ajax({
            url:`${url}/todos`,
            type: "POST",
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: inputData
        }).done(response => {
            $(".form-project").hide()
            $(".todo-list").show()
            $(".member-email").remove()
            $("#projectName").val('')
        }).fail(err => {
            console.log(err)
        })
    })
    $(".holiday").submit(e => {
        e.preventDefault()
        const country = $(".country").val()
        $.ajax({
            url:`${url}/todos/holidays`,
            type: "POST",
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: {
                country
            }
        }).done(response => {
            response.forEach(holiday => {
                appendHoliday(holiday, ".holidays-table")
            })
            $(".holiday-list").show()
            $(".todo-list").hide()
            $(".todo-detail").hide()
        }).fail(err => {
            console.log(err)
        })
    })
})

function appendTodos(obj, element) {
    let checkBtn = null
    for(let i = 0; i < todos.length; i++){
        if(todos[i].todo.id === obj.todo.id){
            if (todos[i].status === "not completed") {
                checkBtn = `<button onClick="checking(${obj.todo.id})" class="btn btn-success">done</button>`
            } else {
                checkBtn = `<button onClick="checking(${obj.todo.id})" class="btn btn-warning">revert</button>`
            }
            break
        }
    }
    $(element)
    .append(`<tr class="todo-item">
                <td>${obj.todo.title}</td>
                <td>${obj.project}</td>
                <td>${obj.todo.status}</td>
                <td>
                ${checkBtn}
                <button onClick="todoDetail(${obj.todo.id})" class="btn btn-info">view detail</button>
                <button onClick="confirmDelete(${obj.todo.id})" class="btn btn-danger">delete</button>
                </td>
            </tr>`)
}
function appendTodo(obj, element) {
    $(element)
    .append(`<tr class="item-detail">
            <td>${obj.todo.title}</td>
            <td>${obj.todo.description}</td>
            <td>${obj.todo.status}</td>
            <td>${obj.todo.due_date}</td>
            <td>${obj.project}</td>
            <td>
                <button onClick="edit(${obj.todo.id})" class="btn btn-info">edit</button>
                <button onClick="confirmDelete(${obj.todo.id})" class="btn btn-danger">delete</button>
            </td>
        </tr>`)
}
function appendHoliday(obj, element) {
    $(element)
    .append(`<tr class="holiday-item">
            <td>${obj.name}</td>
            <td>${obj.date}</td>
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
function getProjects(){
    $.ajax({
        url:`${url}/project`,
        method:'GET',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    }).then(response => {
        response.forEach(project => {
            $("#project")
            .append(`<option class="project-value" value="${project.project}">${project.project}</option>
            `)
        })
    })
}
function getMembers(){
    $.ajax({
        url:`${url}/users`,
        method:'GET',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    }).then(response => {
        response.forEach(user => {
            $("#members")
            .append(`<input type="checkbox name="member-id" value="${user.id}">${user.email}</input>
            `)
        })
    })
}
let members = $('input[name="member-id"]').map(() => { return $(this).val() }).get()

function checking(id) {
    let complete = false
    for(let i = 0; i < todos.length; i++){
        if(todos[i].todo.id === id){
            todos[i].todo.status === "completed" ? complete = true : complete = false
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
            todos.forEach(Todo => {
                if(Todo.todo.id === id){
                    Todo.todo.status = "completed"
                }
                appendTodos(Todo, ".todos-table")
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
            todos.forEach(Todo => {
                if(Todo.todo.id === id){
                    Todo.todo.status = "not completed"
                }
                appendTodos(Todo, ".todos-table")
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
        if(todos[i].todo.id === id){
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
        if(todos[i].todo.id === id){
            $("#updateTitle").val(todos[i].todo.title)
            $("#updateDescription").val(todos[i].todo.description)
            $("#updateDueDate").val(todos[i].todo.due_date)
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
        todos[index].todo.title = title
        todos[index].todo.description = description
        todos[index].todo.due_date = due_date
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
            todos.forEach(Todo => {
                appendTodos(Todo, ".todos-table")
            })
        }).fail(err =>{
            console.log(err)
        })
    })
}

function confirmDelete(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Your Todo cannot be restored!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
      }).then((result) => {
        if (result.value) {
            deleteTodo(id)
        }
      })
}

function deleteTodo(id) {
    $.ajax({
        url:`${url}/todos/${id}`,
        type: "DELETE",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    }).done(response => {
        Swal.fire(
          'Deleted!',
          'Todo successfully deleted.',
          'success'
        )
        $(".item-detail").remove()
        $(".todo-detail").hide()
        $(".todo-list").show()
        let index = null
        for(let i = 0; i < todos.length; i++){
            if(todos[i].todo.id === id){
                index = i
                break
            }
        }
        todos.splice(index, 1)
        $(".todo-item").remove()
        todos.forEach(Todo => {
            appendTodos(Todo, ".todos-table")
        })
    }).fail(err => {
        Swal.fire(
          'Failed!',
          'Something is wrong.',
          'warning'
        )
        console.log(err)
    })
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

window.fbAsyncInit = function() {
    FB.init({
        appId      : '592056835074602',
        cookie     : true,
        xfbml      : true,
        version    : 'v6.0'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fbLogin(){
    FB.login(function(response) {
        if(response.status === 'connected') {
            const user_token = response.authResponse.accessToken
            $.ajax({
                type: 'POST',
                url: `${url}/facebookLogin`,
                data: { user_token }
            }).done(response => {
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
      });
}

function fb_logout(){
    FB.logout(function(response) {
        console.log('user logout')
     });
}