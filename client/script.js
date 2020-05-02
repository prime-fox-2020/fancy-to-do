$(document).ready(function () {
    $(".the-element").hide();

    $("#login-form").submit(function(e) {
        e.preventDefault();
        const email = $('#input-email-login').val();
        const password = $('#input-password-login').val()

        $.ajax({
            url: 'http://localhost:3000/login',
            type: 'POST',
            data: {
                email: email,
                password: password
            }
        })
        .done(function (response) {
            console.log('Login Success')
            localStorage.setItem('access_token', response.access_token)
            check()
        })
        .fail(function (response) {
            $("#modalContent").empty()
            let newModal = `
            <div class="modal-header" id='modalHeader'>
                <h5 class="modal-title" id="exampleModalLabel">${response.responseJSON.errorCode}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>${response.responseJSON.message}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            `
            $("#modalContent").append(newModal)
            $("#failModal").modal('show')
        })
        .always(function (response) {
            console.log('Done')
        })
    })

    $('#new_account').click(function () {
        $('#new_account-btn').hide()
        $('#theLogin').hide()
        $('#theRegister').show()
    })

    $('#register-form').submit(function (e) {
        e.preventDefault()
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
            console.log('Register Success')
            check()
        })
        .fail(function (response) {
            $("#modalContent").empty()
            let newModal = `
            <div class="modal-header" id='modalHeader'>
                <h5 class="modal-title" id="exampleModalLabel">${response.responseJSON.errorCode}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>${response.responseJSON.message}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            `
            $("#modalContent").append(newModal)
            $("#failModal").modal('show')
        })
        .always(function (response) {
            console.log('Done')  
        })
    })
    
    $("#add-todos-form").submit(function (e) {
        e.preventDefault()
        const access_token = localStorage.getItem('access_token')
        const title = $("#input-todos-title").val()
        const description = $('#input-todos-description').val()
        const due_date = $('#input-todos-due_date').val()
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
            $('#input-todos-title').val('')
            $('#input-todos-description').val('')
            $('#input-todos-due_date').val('')
            $('#input-todos-status').val('')

            console.log('Succesfuly added new todo')
            getTodos()
        })
        .fail(function (response) {
            $("#modalContent").empty()
            let newModal = `
            <div class="modal-header" id='modalHeader'>
                <h5 class="modal-title" id="exampleModalLabel">${response.responseJSON.errorCode}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>${response.responseJSON.message}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            `
            $("#modalContent").append(newModal)
            $("#failModal").modal('show')
        })
        .always(function (response) {
            console.log('Done')
        })
    })

    $("#edit-form").submit(function (e) {
        e.preventDefault()
        const access_token = localStorage.getItem('access_token')
        const title = $("#edit-title").val()
        const description = $('#edit-description').val()
        const status = $('#edit-status').val()
        const due_date = $('#edit-due_date').val()
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
            $("#modalContent").empty()
            let newModal = `
            <div class="modal-header" id='modalHeader'>
                <h5 class="modal-title" id="exampleModalLabel">${response.responseJSON.errorCode}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>${response.responseJSON.message}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            `
            $("#modalContent").append(newModal)
            $("#failModal").modal('show')
        })
    })

    $("#confirmDelete").click(function () {
        const access_token = localStorage.getItem('access_token')
        $.ajax({
            method: 'delete',
            url: `http://localhost:3000/todos/${todoId}`,
            headers: {
                access_token: access_token
            }
        })
        .done(response => {
            $("#modalDelete").hide()
            getTodos()
        })
        .fail(response => {
            $("#modalContent").empty()
            let newModal = `
            <div class="modal-header" id='modalHeader'>
                <h5 class="modal-title" id="exampleModalLabel">${response.responseJSON.errorCode}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>${response.responseJSON.message}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            `
            $("#modalContent").append(newModal)
            $("#failModal").modal('show')
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

    $(".clsBtn").click(function () {
        $('#modalDelete').hide()
    })
})

let todoId;
function getId(id) {
    todoId = id
    return todoId
}

function getTodos() {
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
                <td>${i+1}</td>
                <td>${todo[i].title}</td>
                <td>${todo[i].description}</td>
                <td>${todo[i].status}</td>
                <td>${todo[i].due_date}</td>
                <td><a class="btn btn-primary" href="#" role="button" onclick="getTodoById(${todo[i].id})">Edit</a> <a class="btn btn-danger btn-sm" href="#" role="button" onclick="deleteTodo(${todo[i].id})">Delete</a></td>
            </tr>`
            $('#theTodos tbody').append(new_row)
        }
    })
    .fail(function (response) {
        $("#modalContent").empty()
        let newModal = `
        <div class="modal-header" id='modalHeader'>
            <h5 class="modal-title" id="exampleModalLabel">${response.responseJSON.errorCode}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p>${response.responseJSON.message}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        `
        $("#modalContent").append(newModal)
        $("#failModal").modal('show')
    })
}



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
        let todo = response
        $('#edit-form').empty()
        let newForm = `
        <label for="">Title</label>
        <input type="text" name="title" id="edit-title" value="${todo.title}">
        <label for="">Description</label>
        <input type="text" name="description" id="edit-description" value="${todo.description}">
        <label for="">Status</label>
        <select name="" id="edit-status">
            <option value="false">False</option>
            <option value="true">True</option>
        </select>
        <label for="">Due Date</label>
        <input type="date" name="due_date" id="edit-due_date" value="${todo.due_date}">
        <button class="btn btn-primary" type="submit">Save</button>
        <a class="btn btn-danger btn-sm" href="#" role="button" onclick="cancelEdit()">Cancel</a>
        `
        $('#edit-form').append(newForm)
        getId(id)
        $("#theEdit").show()
    })
    .fail(response => {
        $("#modalContent").empty()
        let newModal = `
        <div class="modal-header" id='modalHeader'>
            <h5 class="modal-title" id="exampleModalLabel">${response.responseJSON.errorCode}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p>${response.responseJSON.message}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        `
        $("#modalContent").append(newModal)
        $("#failModal").modal('show')
    })
}

function cancelEdit() {
    check()
}

function deleteTodo (id) {
    getId(id)
    $("#modalDelete").show()
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

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;   
    $.ajax({
        url: "http://localhost:3000/googlelogin",
        type: 'POST',
        data: {token_id: id_token}
    })
    .done(function(response) {
        localStorage.setItem('access_token', response.access_token)
        check()
    })
    .fail(function (response) {
        $("#modalContent").empty()
        let newModal = `
        <div class="modal-header" id='modalHeader'>
            <h5 class="modal-title" id="exampleModalLabel">${response.responseJSON.errorCode}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p>${response.responseJSON.message}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        `
        $("#modalContent").append(newModal)
        $("#failModal").modal('show')
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        auth2.disconnect();
        console.log('User signed out.');
    });
    localStorage.removeItem('access_token')
    check()
}