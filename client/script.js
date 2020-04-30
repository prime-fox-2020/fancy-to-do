$(document).ready(function () {
    $(".the-element").hide();

    $("#login-form").submit(function(e) {
        e.preventDefault();
        console.log('submit');
        const email = $('#input-email-login').val();
        const password = $('#input-password-login').val()
        console.log(email)
        console.log(password)

        $.ajax({
            url: 'http://localhost:3000/login',
            type: 'POST',
            data: {
                email: email,
                password: password
            }
        })
        .done(function (response) {
            console.log('Login Success', response.access_token)
            localStorage.setItem('access_token', response.access_token)
            check()
        })
        .fail(function (response) {
            console.log('gagal nih')
        })
        .always(function (response) {
            console.log('Done', response)
        })
    })

    $('#new_account').click(function () {
        $('#new_account-btn').hide()
        $('#theLogin').hide()
        $('#theRegister').show()
    })

    $('#register-form').submit(function (e) {
        e.preventDefault()
        console.log('register submit')
        const email = $('#input-email-register').val();
        const password = $('#input-password-register').val()

        $.ajax({
            url: 'http://localhost:3000/register',
            type: 'POST',
            data: {
                email: email,
                password: password
            }
        })
        .done(function (response) {
            console.log('Register Success', response)
            check()
        })
        .fail(function (response) {
            console.log('Fail to Register', response)
        })
        .always(function (response) {
            console.log('Done', response)  
        })
    })
    
    $("#add-todos-form").submit(function (e) {
        e.preventDefault()
        const access_token = localStorage.getItem('access_token')
        const title = $("#input-todos-title").val()
        const description = $('#input-todos-description').val()
        const due_date = $('#input-todos-due_date').val()
        console.log(description)
        $.ajax({
            url: 'http://localhost:3000/todos',
            type: 'POST',
            data: {
                title: title,
                description: description,
                due_date: due_date,
                status: false
            },
            headers: {
                access_token : access_token
            }
        })
        .done(function (response) {
            console.log('something')
            $('#input-todos-title').val('')
            $('#input-todos-description').val('')
            $('#input-todos-due_date').val('')
            $('#input-todos-status').val('')

            console.log('Succesfuly added new todo', response)
            getTodos()
        })
        .fail(function (response) {
            console.log('Fail to add new todo', response)
        })
        .always(function (response) {
            console.log('Done', response)
        })
    })

    $("#edit-form").submit(function (e) {
        e.preventDefault()
        const access_token = localStorage.getItem('access_token')
        const title = $("#edit-title").val()
        const description = $('#edit-description').val()
        const status = $('#edit-status').val()
        const due_date = $('#edit-due_date').val()
        console.log(due_date)
        $.ajax({
            url: `http://localhost:3000/todos/${todoId}`,
            type: 'PUT',
            data: {
                title: title,
                description: description,
                status: status,
                due_date: due_date
            },
            headers: {
                access_token : access_token
            }
        })
        .done(function (response) {
            check()
        })
        .fail(function (response) {
            console.log('fail to edit', response)
        })
    })

    if (localStorage.getItem('access_token')) {
        $("#theTodos").show()
        getTodos()
    } else {
        $("#theLogin").show()
    }

    $("#new_account-btn").click(function () {
        $('.the-element').hide()
        $('#theRegister').show()
    })

    $("#login-btn").click(function () {
        $('.the-element').hide()
        $('#theLogin').show()
    })

    $("#logout-btn").click(function () {
        localStorage.removeItem('access_token')
        check()
    })
    
})

function getTodos() {
    console.log('masuk get todos')
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        url: 'http://localhost:3000/todos',
        type: 'GET',
        headers: {
            access_token: access_token
        }
    })
    .done(function (response) {
        let todo = response
        $('#theTodos tbody').empty();
        for (let i = 0; i < todo.length; i++) {
            let new_row = `
            <tr>
                <td>${todo[i].title}</td>
                <td>${todo[i].description}</td>
                <td>${todo[i].status}</td>
                <td>${todo[i].due_date}</td>
                <td><a class="btn btn-danger btn-sm" href="#" role="button" onclick="getTodoById(${todo[i].id})">Edit</a> <a class="btn btn-danger btn-sm" href="#" role="button" onclick="deleteTodo(${todo[i].id})">Delete</a></td>
            </tr>`
            $('#theTodos tbody').append(new_row)
        }
        console.log(response)
    })
    .fail(function (response) {
        console.log('Failed to get asset', response)
    })
}

let todoId;

function getTodoById(id) {
    $(".the-element").hide()
    const access_token = localStorage.getItem('access_token')

    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => {
        console.log(response)
        let todo = response
        let newForm = `
        <label for="">Title</label>
        <input type="text" name="title" id="edit-title" value="${todo.title}">
        <label for="">Description</label>
        <input type="text" name="description" id="edit-description" value="${todo.description}">
        <label for="">Status</label>
        <select name="" id="">
        if (${todo.status} == 'false') {
            <option value="false" id="edit-status" selected>False</option>
        } else {
            <option value="true" id="edit-status" selected>True</option>
        }
        </select>
        <label for="">Due Date</label>
        <input type="text" name="due_date" id="edit-due_date" value="${todo.due_date}">
        <button type="submit">Save</button>
        `
        $('#edit-form').append(newForm)
        getId(id)
        $("#theEdit").show()
    })
    .fail(err => {
        console.log(err)
    })
}

function getId(id) {
    todoId = id
    return todoId
}

function deleteTodo (id) {
    const access_token = localStorage.getItem('access_token')
    $.ajax({
        method: 'delete',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: access_token
        }
    })
    .done(data => {
        console.log(data)
        getTodos()
    })
    .fail(err => {
        console.log(err)
    })
}

function check() {
    if (localStorage.getItem('access_token')) {
        $(".the-element").hide()
        $("#theTodos").show()
        getTodos()
    } else {
        $(".the-element").hide()
        $("#theLogin").show()
    }
}

function logOut() {
    localStorage.removeItem('access_token')
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;   
    $.ajax({
        url: "http://localhost:3000/googlelogin",
        type: 'POST',
        data: {token_id: id_token}

    })
    .done(function(response) {
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        check()
    })
    .fail(function (response) {
        console.log('failed')
    })
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('access_token')
    check()
}