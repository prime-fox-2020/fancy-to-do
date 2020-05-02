$(document).ready(function() {
    
    $('.html-page').hide()

    $('#register-button').click(() => {
        $('#login-page').hide()
        $('#register-page').show()
    })

    $('#login-button').click(() => {
        $('#register-page').hide()
        $('#login-page').show()
    })

    $('#logout-button').click(() => {
        var auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut()
        localStorage.clear()
        // location.reload(true)
        $('.html-page').hide()
        check()
    })

    $('#form-register').submit((e) => {
        e.preventDefault()
        console.log('submit register data')
        const inputName = $('#name-register').val();
        const inputEmail = $('#email-register').val();
        const inputPass = $('#password-register').val();
        console.log(inputName, inputEmail, inputPass)

        $.ajax({
            url: 'http://localhost:3000/user/register',
            type: "POST",
            data : {
                name : inputName,
                email : inputEmail,
                password : inputPass
            }
        })
        .done((response) => {
            console.log(`sukses register email baru >>> ${response}`)
            check()
        })
        .fail((response) => {
            console.log(`gagal register email >>> ${response.responseJSON}`)
        })
        .always((response) => {
            $('#name-register').val('')
            $('#email-register').val("")
            $('#password-register').val("")
            console.log(`always >>> ${response}`)
        })
    })

    $('#form-login').submit((e) => {
        e.preventDefault()
        console.log('submit login data')
        const inputEmail = $('#email-login').val()
        const inputPass = $('#password-login').val()
        console.log(inputEmail, inputPass)

        $.ajax({
            url : 'http://localhost:3000/user/login',
            type : "POST",
            data : {
                email : inputEmail,
                password : inputPass
            }
        })
        .done((response) => {
            // console.log(response)
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('name', response.name)
            console.log(localStorage)
            check()
        })
        .fail((response) => {
            console.log(response)
            console.log(`Login failed >>> ${response.responseJSON}`)
        })
        .always((response) => {
            $('#email-login').val('')
            $('#password-login').val('')
            console.log(`always >> ${response}`)
        })
    })

    $('#add-todo').submit((e) => {
        const token = localStorage.getItem('access_token')
        e.preventDefault()
        const newTitle = $('#title-add').val()
        const newDescription = $('#description-add').val()
        const newDueDate = $('#due_date-add').val()

        $.ajax({
            url : 'http://localhost:3000/todo',
            type: 'POST',
            data : {
                title : newTitle,
                description : newDescription,
                status : false,
                due_date : newDueDate
            },
            headers: {
                access_token : token
            }
        })
        .done((response) => {
            console.log(`Sukses tambah todo >>> ${response}`)
            showTodo()
        })
        .fail((response) => {
            console.log(`Failed tambah todo >>> ${response.responseJSON}`)
        })
        .always(()=>{
            $('#title-add').val('')
            $('#description-add').val('')
            $('#due_date-add').val('')
        })
    })

    $('#edit-todo').submit((e) => {
        e.preventDefault()
        const token = localStorage.getItem('access_token')
        const id = $('#id-edit').val()
        const newTitle = $('#title-edit').val()
        const newDescription = $('#description-edit').val()
        const newDueDate = $('#due_date-edit').val()

        $.ajax({
            url : 'http://localhost:3000/todo/' + id,
            type : 'PUT',
            data : {
                title : newTitle,
                description : newDescription,
                due_date : newDueDate
            },
            headers : {
                access_token : token
            }
        })
        .done((response) => {
            console.log('Data sukses di edit >>>' + response)
            check()
        })
        .fail((response) => {
            console.log('Data failed to edit >>> ' + response.responseJSON)
        })
        .always((response) => {
            console.log(response)
        })
    })

    $('#delete-todo').submit((e) => {
        e.preventDefault()
        const token = localStorage.getItem('access_token')
        const id = $('#delete-id').val()

        $.ajax({
            url : 'http://localhost:3000/todo/' + id,
            type : 'DELETE',
            headers : {
                access_token : token
            }
        })
        .done((response) => {
            console.log(`Data has been deleted >>> ${response}`)
            $('#deleteModal').modal('hide')
            check()
        })
        .fail((response) => {
            console.log(response)
        })
    })
    
});

function showTodo(){
    const token = localStorage.getItem('access_token')
    $.ajax({
        url: 'http://localhost:3000/todo',
        type: 'GET',
        headers: {
            access_token : token
        }
    })
    .done((response) => {
        $('#todo-body').empty()
        for (let i = 0; i<response.length; i++){
            let status = ''
            if(response[i].status == false){
                status = 'Pending'
            } else {
                status = 'Completed'
            }
            let new_row = `
            <tr>
            <td> ${response[i].title} </td>
            <td> ${response[i].description} </td>
            <td> ${status} </td>
            <td> ${response[i].due_date} </td>
            <td> <button onclick="listen(${response[i].id})">LISTEN</button>
            <button onclick="showEdit(${response[i].id})">EDIT</button>
            <button onclick="confirmDelete(${response[i].id})" >DELETE</button> </td>
            </tr>
            `
            $('#todo-body').append(new_row)
        }
        console.log(response)
    })
    .fail((response) => {
        console.log(`Failed data >>> ${response.responseJSON}`)
    })
}

function showEdit(id){
    const token = localStorage.getItem('access_token')
    $.ajax({
        url : 'http://localhost:3000/todo/' + id,
        type : 'GET',
        headers : {
            access_token : token
        }
    })
    .done((response) => {
        $('#add-todo-page').hide()
        $('#edit-todo-page').show()
        $('#id-edit').val(response.id)
        $('#title-edit').val(response.title)
        $('#description-edit').val(response.description)
        $('#due_date-edit').val(response.due_date)
    })
    .fail((response) => {
        console.log('Failed to get data >>> ' + response.responseJSON)
    })
}

function listen(id){
    const token = localStorage.getItem('access_token')
    $.ajax({
        url : 'http://localhost:3000/todo/' + id,
        type : 'GET',
        headers : {
            access_token : token
        }
    })
    .done((response) => {
        listenVoice(response)
    })
    .fail((response) => {
        console.log('Failed to get data >>> ' + response.responseJSON)
    })
}

function listenVoice(data) {
    $.ajax({
        type : 'GET',
        url : "http://localhost:3000/voice/" + data.description
    })
    .done((response) => {
        new Audio(response.url).play()
    })
    .fail((response) => {
        console.log('Failed to get data >>> ' + response.responseJSON)
    })
}

function confirmDelete(id){
    const token = localStorage.getItem('access_token')
    $.ajax({
        url : 'http://localhost:3000/todo/' + id,
        type : 'GET',
        headers : {
            access_token : token
        }
    })
    .done((response) => {
        $('#deleteModal').modal('show')
        $('#delete-id').val(response.id)
    })
    .fail( (response) => {
        console.log('Failed to get data >>> ' + response.responseJSON)
    })
}

function onSignIn(googleUser){
    var google_name = googleUser.getBasicProfile().getName();
    let id_token = googleUser.getAuthResponse().id_token;

    // console.log(google_name);

    $.ajax({
        url : 'http://localhost:3000/user/googleSignIn',
        type : "POST",
        data : {
            id_token : id_token,
            g_name : google_name
        }
    })
    .done((response) => {
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('name', response.name)
        console.log(localStorage)
        check()
    })
    .fail((response) => {
        console.log('Failed Login >>> ')
        console.log(response.responseJSON)
    })
}

function check(){
    if (localStorage.getItem('access_token')){
        $('.html-login').hide()
        $('.html-page').hide()
        $('#logout').show()
        $('#logout p').text(`Welcome, ${localStorage.name}!`)
        $('#todo-page').show()
        $('#add-todo-page').show()
        showTodo()
        $('#logout-button').show()
    } else {
        $('.html-login').show()
    }
}