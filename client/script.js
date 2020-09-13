const base_url = 'http://localhost:3000'

$(document).ready(function () {
    isSignedIn()
})

function showHome () {
    $('#signin').show()
    $('#signup').hide()
    $('#mainNav').hide()
    $('#dashboard').hide()
}

function showSignIn (event) {
    event.preventDefault()
    $('#signin').show()
    $('#signup').hide()
}

function showSignUp (event) {
    event.preventDefault()
    $('#signin').hide()
    $('#signup').show()
}

// start sign IN process
$('#formSignIn').on('submit', function (event) {
    event.preventDefault()
    const email = $('#emailSignIn').val()
    const password = $('#passwordSignIn').val()

    $.ajax({
        method: 'POST',
        url: base_url + '/user/signin',
        data: { email, password }
    })
    .done(function (response) {
        console.log(response)
        const access_token = response.access_token
        $('#emailSignIn').val('')
        $('#emailSignIn').val('')
        localStorage.setItem('access_token', access_token)
        // then show dashboard
        showDashboard()
    })
    .fail(function (err) {
        console.log(err.responseJSON.messages)
    })
})
// end sign IN process

// start sign UP process
$('#formSignUp').on('submit', function (event) {
    event.preventDefault()
    const name = $('#nameSignUp').val()
    const email = $('#emailSignUp').val()
    const password = $('#passwordSignUp').val()

    $.ajax({
        method: 'POST',
        url: base_url + '/user/signup',
        data: { name, email, password }
    })
    .done(function (response) {
        console.log(response)
        $('#signin').show()
        $('#signup').hide()
        $('#passwordSignIn').val(password)
        $('#emailSignIn').val(email)
    })
    .fail(function (err) {
        console.log(err.responseJSON.messages)
    })
})
// end sign UP process

// start sign OUT process
function signOut (event) {
    event.preventDefault()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.removeItem('access_token')
    });
    showHome()
}
// end sign OUT process

function isSignedIn () {
    if (localStorage.access_token) {
        showDashboard()
    } else {
        showHome()
    }
}

function showDashboard () {
    $('#signin').hide()
    $('#signup').hide()

    $('#mainNav').show()
    $('#dashboard').show()
    $('#editTodo').hide()
    $.ajax({
        method: 'GET',
        url: base_url + '/todos',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(function (response) {
        console.log(response)
        $('#bodyTodoList').empty()
        response.todos.forEach(el => {
            $('#bodyTodoList').append(`
                <tr>
                    <th>${el.title}</th>
                    <td>${el.description}</td>
                    <td>${el.status}</td>
                    <td>${formatDate(el.due_date)}</td>
                    <td>
                        <a class="btn btn-sm btn-info" data-toggle="modal" data-target="#modal_getTrivia" onclick="getTrivia(${el.id})"><i class="fas fa-info-circle"></i></i></a>
                        <a class="btn btn-sm btn-info" href="" onclick="edit(event, ${el.id})" style="color: black"><i class="far fa-edit"></i></a>
                        <a class="btn btn-sm btn-warning" href="" onclick="deleteTodo(event, ${el.id})"><i class="far fa-trash-alt"></i></a>
                    </td>
                </tr>
            `)
        });
    })
    .fail(function (err) {
        console.log(err.responseJSON)
    })
}

// start create new todo process
$('#postTodo').on('submit', function (event) {
    event.preventDefault()
    const title = $('#postTitle').val()
    const description = $('#postDescription').val()
    const status = $('#postStatus').val()
    const due_date = $('#postDueDate').val()

    $.ajax({
        method: 'POST',
        url: base_url + '/todos',
        headers: {
            access_token: localStorage.access_token
        },
        data: { title, description, status, due_date }
    })
    .done(function (response) {
        console.log(response)
        showDashboard()
    })
    .fail(function (err) {
        console.log(err.responseJSON.messages)
    })
})
// end create new todo process

function edit (event, id) {
    event.preventDefault()
    $('#editTodo').show()
    $('#table').hide()
    $.ajax({
        method: 'GET',
        url: base_url + '/todos/' + id,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(function (response) {
        console.log(response)
        $('#editId').val(response.id); 
        $('#editTitle').val(response.title); 
        $('#editDescription').val(response.description); 
        $('#editStatus').val(response.status); 
        $('#editDueDate').val(formatDate(response.due_date));
    })
    .fail(function (err) {
        console.log(err.responseJSON.messages)
    })
}

// start edit todo process
$('#editTodo').on('submit', function (event) {
    console.log('sampe')
    event.preventDefault()
    const id = $('#editId').val()
    const title = $('#editTitle').val()
    const description = $('#editDescription').val()
    const status = $('#editStatus').val()
    const due_date = $('#editDueDate').val()

    $.ajax({
        url: base_url + '/todos/' + id,
        method: 'PUT',
        headers: {
            access_token: localStorage.access_token
        },
        data: { title, description, status, due_date }
    })
    .done(function (response) {
        console.log(response)
        showDashboard()
        $('#table').show()
    })
    .fail(function (err) {
        console.log(err.responseJSON.messages)
    })
})
// end edit todo process

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function cancelEdit (event) {
    event.preventDefault()
    $('#editTodo').hide()
    $('#table').show()
}

// delete process
function deleteTodo (event, id) {
    event.preventDefault()
    $.ajax({
        method: 'DELETE',
        url: base_url + '/todos/' + id,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(function (response) {
        console.log(response)
        showDashboard()
    })
    .fail(function (err) {
        console.log(err.responseJSON.messages)
    })
}

//getTrivia process
function getTrivia (id) {
    $.ajax({
        method: 'GET',
        url: base_url + '/todos/getTrivia/' + id,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(function (response) {
        console.log(response)
        $('#year').text('In ' + response.year)
        $('#text').text(response.text)
    })
    .fail(function (err) {
        console.log(err.responseJSON.messages)
    })
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: `${base_url}/user/googleSignIn`,
        method: 'POST',
        headers: {
            google_token: id_token
        }
    })
    .done(data => {
        console.log(data)
        localStorage.setItem('access_token', data.access_token)
        showDashboard()
    })
    .fail(err => {
        console.log(err)
    })
}