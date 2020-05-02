$(document).ready(function() {
    if(!localStorage.getItem("access_token") || localStorage.getItem("access_token") == null){
        $('#nav-todos').hide()
        $('#nav-register').show()
        $('#nav-login').show()
        $('#nav-logout').hide()
        $('#id_login').hide()
        $('#id_regis').show()
        $('#getTodo').hide()
        $('#addTodo').hide()
        $('#updateTodo').hide()
    } else {
        $('#nav-todos').show()
        $('#nav-register').hide()
        $('#nav-login').hide()
        $('#nav-logout').show()
        $('#id_login').hide()
        $('#id_regis').hide()
        $('#getTodo').show()
        $('#addTodo').hide()
        $('#updateTodo').hide()
        getTodos()
    }
     
    $('#nav-register').click( function (event) {
        event.preventDefault()
        $('#nav-todos').hide()
        $('#nav-login').show()
        $('#nav-logout').hide()
        $('#id_login').hide()
        $('#id_regis').show()
        $('#getTodo').hide()
        $('#addTodo').hide()
        $('#updateTodo').hide()
    })

    $('#nav-login').click(function (event){
        event.preventDefault()
        $('#nav-todos').hide()
        $('#nav-register').show()
        $('#nav-logout').hide()
        $('#id_regis').hide()
        $('#id_login').show()
        $('#getTodo').hide()
        $('#addTodo').hide()
        $('#updateTodo').hide()
    })

    $('#nav-todos').click(function (event){
        event.preventDefault()
        $('#nav-todos').show()
        $('#nav-register').hide()
        $('#nav-logout').show()
        $('#id_registrasi').hide()
        $('#id_login').hide()
        $('#getTodo').show()
        $('#addTodo').hide()
        $('#updateTodo').hide()
    })

    $('#btnAddTodo').click(event => {
        event.preventDefault()
        $('#nav-todos').show()
        $('#nav-register').hide()
        $('#nav-logout').show()
        $('#id_registrasi').hide()
        $('#id_login').hide()
        $('#getTodo').hide()
        $('#addTodo').show()
        $('#updateTodo').hide()
    })
})
;

$("#id_login").submit(function( event ) {
    event.preventDefault();
    var email = $("#emailLogin").val()
    var password = $("#passwordLogin").val()

    console.log(email)
    console.log(password) 
    
    $.ajax({
        type:"POST",
        crossDomain : true,
        url : "http://localhost:3000/users/login",
        data : {
            email : email, 
            password : password
        }
    })
    .done(function (response) {
        localStorage.setItem("access_token", response.access_token)
        location.reload()
    })
    .fail(err => {
        console.log(err)
    })
    
});

function getTodos() {
    var token = localStorage.getItem('access_token')

    $.ajax({
        type : "GET",
        crossDomain : true,
        url : "http://localhost:3000/todos",
        headers : {
            access_token : token
        } 
    })
    
    .done(res => {

        $('#getTodo tbody').empty()

        for(let i=0; i<res.length; i++) {

            const date = new Date(res[i].due_date)
            const MyDateString = (date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))

            $newData = `
            <tr id = ${res[i].id}>
                <td>${res[i].title}</td>
                <td>${res[i].description}</td>
                <td>${res[i].status}</td>
                <td>${MyDateString}</td>
                <td>
                    <a onclick="updateForm(${res[i].id})"><button class="btn btn-success" type="submit">Edit</button></a>
                    <a onclick="deleteTodo(${res[i].id})"><button class="btn btn-danger" type="submit">Delete</button></a>
                </td>
            </tr>`;

  			$('#getTodo tbody').append($newData);
        }
    })
    .fail(err => {
        console.log(err)
    })
}

$("#addTodo").submit(function(event) {
    event.preventDefault()

    var token = localStorage.getItem('access_token')
    console.log(token)

    var title = $("#title").val()
    var description = $("#description").val()
    var status = $("#status").val()
    var due_date = $("#due_date").val()

    console.log(title)
    console.log(description)
    console.log(status)
    console.log(due_date)

    $.ajax({
        type : "POST",
        crossDomain : true,
        url : "http://localhost:3000/todos",
        data : {
            title : title,
            description : description,
            status : status,
            due_date : due_date
        },
        headers : {
            'access_token' : token
        }
    })
    .done(res => {
        $("#title").val('')
        $("#description").val('')
        $("#status").val('')
        $("#due_date").val('')

        getTodos()

        $('#addTodo').hide()
        $('#getTodo').show()
        $('#updateTodo').hide()
    })
    .fail(err => {
        console.log(err)
    })
})

function deleteTodo(id) {
    var token = localStorage.getItem('access_token')

    $.ajax({
        method : "DELETE",
        crossDomain : true,
        url : `http://localhost:3000/todos/${id}`,
        headers : {
            access_token : token
        } 
    })
    .done(data => {
        console.log("berhasil menghapus")
        getTodos()
    })
    .fail(err => {
        console.log(err)
    })
}

function updateForm(id) {
    $('#addTodo').hide()
    $('#updateTodo').show()
    $('#getTodo').hide()
    $('#id_login').hide()
    
    var token = localStorage.getItem('access_token')

    $.ajax({
        type : "GET",
        crossDomain : true,
        url : `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: token
        }
    })
    .done(data => {
        $('#updateId').empty()
        $('#updateTitle').empty()
        $('#updateDescription').empty()
        $('#updateStatus').empty()
        $('#updateDue_date').empty()

        const date = new Date(data.due_date)
        const MyDateString = (date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))

        $('#updateId').append(`<input type="number" disabled class="form-control" id="updateIdVal" value="${data.id}">`)
        $('#updateTitle').append(`<input type="text" class="form-control" id="updateTitleVal" value="${data.title}">`)
        $('#updateDescription').append(`<input type="text" class="form-control" id="updateDescriptionVal" value="${data.description}">`)
        $('#updateStatus').append(`<input type="text" class="form-control" id="updateStatusVal" value="${data.status}">`)
        $('#updateDue_date').append(`<input type="date" class="form-control" id="updateDue_dateVal" value="${MyDateString}">`)
    })
    .fail(err => {
        console.log(err)
    })
}

$('#updateTodo').submit(e => {
    e.preventDefault()
    
    let id = $('#updateIdVal').val()

    var token = localStorage.getItem('access_token')

    let data = {
        title : $('#updateTitleVal').val(),
        description : $('#updateDescriptionVal').val(),
        status : $('#updateStatusVal').val(),
        due_date : $('#updateDue_dateVal').val()
    }

    $.ajax({
        type : "PUT",
        crossDomain : true,
        url : `http://localhost:3000/todos/${id}`,
        data : data,
        headers : {
            'access_token' : token
        }
    })
    
    .done(updateForm => {
        $('#updateId').val('')
        $('#updateTitle').val('')
        $('#updateDesription').val('')
        $('#updateStatus').val('')
        $('#updateDue_date').val('')

        getTodos()

        $('#addTodo').hide()
        $('#updateTodo').hide()
        $('#getTodo').show()
    })
    .fail(err => {
        console.log(err)
    })
})

$('#id_regis').submit(event => {
    event.preventDefault()

    const email = $('#emailRegis').val()
    const password = $('#passwordRegis').val()

    console.log(email)
    console.log(password)

    $.ajax({
        method : "POST",
        crossDomain : true,
        url : `http://localhost:3000/users/registrasi`,
        data : {
            email : email,
            password : password
        } 
    })
    .done(res => {
        console.log(res)
        $('#nav-todos').hide()
        $('#nav-register').hide()
        $('#nav-login').show()
        $('#nav-logout').hide()
        $('#id_login').show()
        $('#id_regis').hide()
        $('#getTodo').hide()
        $('#addTodo').hide()
        $('#updateTodo').hide()
    })
    .fail(err => {
        console.log(err)
    })
})

function logOut(){
    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
        console.log('User signed out.');
    });

    localStorage.removeItem('access_token')
    $('#nav-todos').hide()
    $('#nav-register').show()
    $('#nav-login').show()
    $('#nav-logout').hide()
    $('#id_login').hide()
    $('#id_regis').show()
    $('#getTodo').hide()
    $('#addTodo').hide()
    $('#updateTodo').hide()
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/google-sign",
        data: { id_token : id_token }
    })
    .done(data => {
        localStorage.setItem("access_token", data)
        $('#nav-todos').show()
        $('#nav-register').hide()
        $('#nav-login').hide()
        $('#nav-logout').show()
        $('#id_login').hide()
        $('#id_regis').hide()
        $('#getTodo').show()
        $('#addTodo').hide()
        $('#updateTodo').hide()
    })
    .fail(err => {
        console.log(err)
    })
}