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

});


function showTodos(){
    let token = localStorage.acces_token
    // console.log(token)   
    $.ajax({
        url: 'http://localhost:3000/todos',
        type: 'GET',
        headers: {
            "acces_token": token
        },
    })
    .done(todos => {
        console.log('response', todos);
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
                    <a onclick="deleteTodo(${el.id})"><button class="btn btn-danger" type="submit">Delete</button></a>
                </td>
            <tr>
        `
            $('#todos').append($new_row)
        });
    })
    .fail(err => {
        console.log(err);
    })
}

$('#add-todo').submit(function(e){
    e.preventDefault()

    let token = localStorage.acces_token
    // console.log(token)
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
        console.log(newTodo);
        $('#success').empty()
        $('#error').empty()
        $('#add-title').val(''),
        $('#add-description').val(''),
        $('#add-due_date').val('')

        showTodos()
        $('#field-add-todo').hide()
        $('#field-todos').show()
        $('#field-edit-todo').hide()

        $('#success').append(`<div class="alert alert-success" role="alert"> Todo with title ${newTodo.title} has been added </div>`)
    })
    .fail(err => {
        console.log(data)
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert"> Data yang Anda isi Salah </div>`)
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
        method: 'GET',
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
        $('#edit-title').append(`<input class="form-control" id="edit-title-val" value="${todo.title}" autofocus placeholder="${todo.title}">`)
        $('#edit-description').append(`<textarea class="form-control" id="edit-description-val" rows="4" value="${todo.description}" placeholder="${todo.description}"></textarea>`)
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
        $('#error').append(`<div class="alert alert-danger" role="alert">Failed to get todos from server</div>`)
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
        method: 'PUT',
        data: data,
        headers: {
            'acces_token': token
        },
    })
    .done(editTodo => {
        console.log( $('#edit-title').val())
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

    })
    .fail(err => {
        $('#error').empty()
        console.log(data)
        console.log(err)
        $('#error').append(`<div class="alert alert-danger" role="alert">Incorrect data</div>`)
    })
})

function deleteTodo(id){
    let token = localStorage.acces_token
    // console.log(token)
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: 'DELETE',
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

        $('#success').append(`<div class="alert alert-success" role="alert">Todo has been deleted</div>`)
    })
    .fail(err => {
        $('#error').empty()
        $('#error').append(`<div class="alert alert-danger" role="alert">Error delete</div>`)
    })
}

function showHolidays(){
    let token = localStorage.acces_token
    // console.log(token)
    $.ajax({
        url: 'http://localhost:3000/todos/holidays',
        type: 'GET',
        headers: {
            "acces_token": token
        },
    })
    .done(holidays => {
        console.log('response', holidays);
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
        console.log(err);
    })
}
