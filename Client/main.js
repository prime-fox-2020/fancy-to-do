$(document).ready(function(){
    if (!localStorage.getItem('acces_token') || localStorage.getItem('acces_token') == null) {
        $('#nav-register').show()
        $('#nav-login').show()
        $('#nav-todos').hide()
        $('#nav-holidays').hide()
        $('#nav-logout').hide()
        $('#field-login').hide()
        $('#field-register').show()
        $('#field-todos').hide()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()
    } else {
        showTodos()
        $('#nav-register').hide()
        $('#nav-login').hide()
        $('#nav-todos').show()
        $('#nav-holidays').show()
        $('#nav-logout').show()
        $('#field-login').hide()
        $('#field-register').hide()
        $('#field-todos').show()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()
    }

    $('#nav-register').click(function(e){
        e.preventDefault()
        $('#field-register').show()
        $('#field-login').hide()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()
    })

    $('#nav-login').click(function(e){
        e.preventDefault()
        $('#field-login').show()
        $('#field-register').hide()
        $('#field-todos').hide()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()
    })

    $('#nav-todos').click(function(e){
        e.preventDefault()
        $('#field-register').hide()
        $('#field-login').hide()
        $('#field-todos').show()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()
    })

    $('#nav-holidays').click(function(e){
        e.preventDefault()
        $('#field-register').hide()
        $('#field-login').hide()
        $('#field-todos').hide()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-holidays').show()
        showHolidays()
    })

    $('#todos-add-todo').click(function(e){
        e.preventDefault()
        $('#field-register').hide()
        $('#field-login').hide()
        $('#field-todos').hide()
        $('#field-add-todo').show()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()
    })

    $('#nav-logout').click(function(e){
        e.preventDefault()
        $('#success').empty()
        $('#error').empty()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-todos').hide()
        $('#field-logout').hide()
        $('#field-login').hide()
        $('#field-holidays').hide()
        logout()
    })
});



$('#register').submit(function(e){
    e.preventDefault()

    let data = {
        username: $('#register_username').val(),
        email: $('#register_email').val(),
        password: $('#register_password').val(),
    }
    
    $.ajax({
        url: 'http://localhost:3000/register',
        type: 'POST',
        data: data,
    })
    .done(register => {
        $('#success').empty()
        $('#error').empty()
        $('#reqgister_username').val('')
        $('#register_email').val('')
        $('#register_password').val('')

        $('#field-register').hide()
        $('#field-login').show()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()

        $('#success').append(`<div class="alert alert-success" role="alert">${register.username}, you have successfully registered</div>`)
    })
    .fail(err => {
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>`)
    })
})


$('#login').submit(function(e){
    e.preventDefault()

    let data = {
        email: $('#login_email').val(),
        password: $('#login_password').val()
    }

    $.ajax({
        url: 'http://localhost:3000/login',
        type: 'POST',
        data: data
    })
    .done(login => {
        $('#login_email').val('')
        $('#login_password').val('')
        $('#success').empty()
        $('#error').empty()

        $('#nav-login').hide()
        $('#nav-register').hide()
        $('#nav-todos').show()
        $('#nav-holidays').show()
        $('#nav-logout').show()
        $('#field-register').hide()
        $('#field-login').hide()
        $('#field-todos').show()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()
        
        localStorage.setItem('acces_token', login.acces_token)
        showTodos()
        console.log('sign in')
    })
    .fail(err => {
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>`)
    })
}) 


function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/google-signin',
        type: 'POST',
        data: {
            id_token: id_token
        }
    })
    .done(data => {
        $('#success').empty()
        $('#error').empty()
        $('#nav-login').hide()
        $('#nav-register').hide()
        $('#nav-todos').show()
        $('#nav-holidays').show()
        $('#nav-logout').show()
        $('#field-register').hide()
        $('#field-login').hide()
        $('#field-todos').show()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()
        
        localStorage.setItem('acces_token', data.acces_token)
        showTodos()
        console.log('sign in')
    })
    .fail(err => {
        console.log(err)
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert">${err.responseJSON}</div>`)
    })
}



function showTodos(){
    let token = localStorage.acces_token
    $.ajax({
        url: 'http://localhost:3000/todos',
        type: 'GET',
        headers: {
            "acces_token": token
        },
    })
    .done(todos => {
        $('#todos').empty()

        todos.forEach(el => {
            let tempStatus = ''
            if (el.status == false) {
                tempStatus = 'Undone'
            } else {
                tempStatus = 'Done'
            }

            $new_row = `
            <tr>
                <td scope="col">${el.title}</td>
                <td scope="col">${el.description}</td>
                <td scope="col">${tempStatus}</td>
                <td scope="col">${el.due_date}</td>
                <td scope="col">
                    <a onclick="editTodo(${el.id})"><button class="btn btn-success" type="submit">Edit</button></a>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal${el.id}">
                        Delete
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal${el.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Delete</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Are you sure ?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteTodo(${el.id})">Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `
            $('#todos').append($new_row)
        });
    })
    .fail(err => {
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>`)
    })
}


$('#add-todo').submit(function(e){
    e.preventDefault()

    let token = localStorage.acces_token
    let data = {
        title: $('#add-title').val(),
        description: $('#add-description').val(),
        due_date: $('#add-due_date').val()
    }

    $.ajax({
        url: 'http://localhost:3000/todos',
        type: 'POST',
        data: data,
        headers: {
            'acces_token': token
        },
    })
    .done(newTodo => {
        $('#success').empty()
        $('#error').empty()
        $('#add-title').val(''),
        $('#add-description').val(''),
        $('#add-due_date').val('')

        showTodos()
        $('#field-add-todo').hide()
        $('#field-todos').show()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()

        $('#success').append(`<div class="alert alert-success" role="alert"> Todo with title ${newTodo.title} has been added </div>`)
    })
    .fail(err => {
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert">${err.responseJSON}</div>`)
    })
})


function editTodo(id){
    $('#field-add-todo').hide()
    $('#field-edit-todo').show()
    $('#field-todos').hide()
    $('#field-logout').hide()
    $('#field-login').hide()
    $('#field-holiday').hide()

    let token = localStorage.getItem('acces_token')
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        type: 'GET',
        headers: {
            'acces_token': token
        },
    })
    .done(todo => {
        $('#edit-id').empty()
        $('#edit-title').empty()
        $('#edit-description').empty()
        $('#edit-status').empty()
        $('#edit-due_date').empty()

        $('#edit-id').append(`<input class="form-control" id="edit-id-val" value="${todo.id}" hidden readonly placeholder="${todo.id}">`)
        $('#edit-title').append(`<input class="form-control" id="edit-title-val" value="${todo.title}">`)
        $('#edit-description').append(`<textarea class="form-control" id="edit-description-val" rows="4">${todo.description}</textarea>`)
        if (todo.status) {  
            $('#edit-status').append(`<select id="edit-status-val" class="form-control" >
                                        <option selected disabled>Choose</option>
                                        <option value="true">Done</option>
                                        <option value="false" selected>Undone</option>
                                    </select>`)
        } else {
            $('#edit-status').append(`<select id="edit-status-val" class="form-control">
                                        <option selected disabled>Choose</option>
                                        <option value="true">Done</option>
                                        <option value="false" selected>Undone</option>
                                    </select>`)
        }
        $('#edit-due_date').append(`<input type="date" class="form-control" id="edit-due_date-val" value="${todo.due_date}" placeholder="${todo.due_date}">`)
    })
    .fail(err => {
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>`)
    })
}

// POST EDIT

$('#edit-todo').submit(function(e){
    e.preventDefault()
    let id = $('#edit-id-val').val()

    let token = localStorage.acces_token
    let data = {
        id: $('#edit-id-val').val(),
        title: $('#edit-title-val').val(),
        description: $('#edit-description-val').val(),
        status: $('#edit-status-val').val(),
        due_date: $('#edit-due_date-val').val()
    }
    

    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        type: 'PUT',
        data: data,
        headers: {
            'acces_token': token
        },
    })
    .done(editTodo => {
        $('#success').empty()
        $('#error').empty()
        $('#edit-id').val('')
        $('#edit-title').val('')
        $('#edit-description').val('')
        $('#edit-status').val('')
        $('#edit-due_date').val('')

        showTodos()
        $('#field-add-todo').hide()
        $('#field-edit-todo').hide()
        $('#field-todos').show()
        $('#field-holidays').hide()

        $('#success').append(`<div class="alert alert-success" role="alert">${editTodo.message}</div>`)
    })
    .fail(err => {
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert">${err.responseJSON}</div>`)
    })
})

function deleteTodo(id){
    let token = localStorage.acces_token
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        type: 'DELETE',
        headers: {
            'acces_token': token
        }
    })
    .done(deleteTodo => {
        $('#success').empty()
        $('#error').empty()

        showTodos()
        $('#field-add-todo').hide()
        $('#field-todos').show()
        $('#field-edit-todo').hide()
        $('#field-holidays').hide()
        $('#modal').hide()

    })
    .fail(err => {
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>`)
    })
}

function showHolidays(){
    let token = localStorage.acces_token
    $.ajax({
        url: 'http://localhost:3000/todos/holidays',
        type: 'GET',
        headers: {
            "acces_token": token
        },
    })
    .done(holidays => {
        $('#holidays').empty()

        holidays.forEach(el => {
            $new_row = `
            <tr>
                <td scope="col">${el.name}</td>
                <td scope="col">${el.description}</td>
                <td scope="col">${el.date}</td>
                <td scope="col">${el.country}</td>
                <td scope="col">${el.type}</td>
            <tr>
        `
            $('#holidays').append($new_row)
        });
    })
    .fail(err => {
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>`)
    })
}


function logout() {

    var auth2 = gapi.auth2.getAuthInstance();
    if (auth2) {
        auth2.signOut().then(function() {
            console.log('signed out');
        });
    }

    localStorage.removeItem('token')
    localStorage.clear()
    $('#success').empty()
    $('#nav-login').show()
    $('#nav-register').show()
    $('#nav-todos').hide()
    $('#nav-holidays').hide()
    $('#nav-logout').hide()
    $('#field-login').show()
    $('#field-todos').hide()
    $('#field-add-todo').hide()
    $('#field-edit-todo').hide()
    $('#field-holidays').hide()

    $('#success').append(`<div class="alert alert-success" role="alert">You have successfully logged out</div>`)
}