let todoId;
$(document).ready(function () {

    $("#add-todo-page").hide()
    $("#edit-todo-page").hide()
    $("#get-todo-page").hide()
    $("#register-page").hide()
    $("#login-page").hide()
    $("#qrcode").hide()
    check()


    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
    //login button 
    $("#login-form").submit(function (e) {
        e.preventDefault()
        const valEmailLogin = $("#email-login").val()
        const valPassLogin = $("#password-login").val()
        // console.log(valEmail,valPass)

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users/login",
            data: {
                email: valEmailLogin,
                password: valPassLogin
            }
        })
            .done(response => {
                console.log('Login Success!', response)
                $('#login-page').hide()
                $('#get-todo-page').show()
                localStorage.setItem('access_token', response.access_token)
                getTodos()
            })
            .fail(response => {
                console.log('Login Failed!', response)
            })
            .always(() => {
                console.log('Login Finished!!')
            })

    })
    //register link for login page 
    $("#register-link").click(() => {
        console.log('clicked!')
        $("#login-page").hide()
        $("#register-page").show()
    })
    //login link for register page 
    $("#login-link").click(() => {
        console.log('clicked!')
        $("#login-page").show()
        $("#register-page").hide()
    })

    //logout button for get-todo-page
    $("#signout-button").click(() => {
        $("#get-todo-page").hide()
        $("#login-page").show()
    })
    //register button 
    $("#register-form").submit(function (e) {
        e.preventDefault()
        const valEmailReg = $("#email-register").val()
        const valPassReg = $("#password-register").val()
        console.log(valEmailReg, valPassReg)

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users/register",
            data: {
                email: valEmailReg,
                password: valPassReg
            }
        })
            .done(response => {
                console.log('Register success!', response)
                $('#register-page').hide()
                $('#login-page').show()
            })
            .fail(response => {
                console.log('Register Failed!', response)
            })
            .always(() => {
                console.log('Register Finished!')
            })
    })
    //add button on todo page 
    $("#add-todo-button").click(() => {
        $("#get-todo-page").hide()
        $("#add-todo-page").show()
    })

    //cancel button on add page 
    $("#add-cancel").click(() => {
        console.log('clicked!')
        $("#get-todo-page").show()
        $("#add-todo-page").hide()
    })

    //add page 
    $("#add-form").submit(function (e) {
        e.preventDefault()
        const addTitle = $("#add-title").val()
        const addDesc = $("#add-desc").val()
        const addStatus = $("#add-status").val()
        const addDate = $("#add-due-date").val()
        // console.log(addTitle,addDesc,addStatus,addDate)
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/todos",
            data: {
                title: addTitle,
                description: addDesc,
                status: addStatus,
                due_date: addDate,
            },
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })

            .done(response => {
                console.log('add success!', response)
                $("#add-todo-page").hide()
                $("#get-todo-page").show()
                getTodos()
            })
            .fail(response => {
                console.log('add failed!', response)

            })
            .always(() => {
                console.log('add finished!')
            })
    })
    //cancel button on edit page 
    $("#edit-cancel").click(() => {
        console.log("clicked!")
        $("#get-todo-page").show()
        $("#edit-todo-page").hide()
    })

    //delete button on modal 
    // $("#delete-button").click(()=>{

    //     const id= $("#modal-delete").attr('data-id')
    //     console.log(id)
    //     // deleteTodo(id)
    // })
    $(document).on("click", "#modal-delete", function (e) {
        console.log(this)
        console.log($("#exampleModal"))
        // $("#exampleModal").modal('show')
        const id = $(this).attr("data-id")
        console.log(id)
        $("#delete-button").click(() => {
            deleteTodo(id)

        })
    })
    $(document).on("click", "#qr-code", function () {
        // console.log(this)
        const titleTodo = $(this).attr("data-title")
        console.log(titleTodo)
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/qr?text=` + titleTodo
        })
            .done(response => {
                $("#qrcode").show()
                $("#get-todo-page").hide()
                $("#img-qr").attr("src", response.result.qr)
            })
            .fail(response => {
                console.log('failed', response)
            })
            .always(() => {
                console.log('finished!')
            })
    })
    $("#edit-form").submit(function (e) {
        console.log('clicked')
        e.preventDefault()
        const newTitle = $("#edit-title").val()
        const newDesc = $("#edit-desc").val()
        const newStatus = $("#edit-status").val()
        const newDate = $("#edit-due-date").val()

        // console.log(newTitle,newDesc,newDate,newStatus)
        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/todos/${todoId}`,
            data: {
                title: newTitle,
                description: newDesc,
                status: newStatus,
                due_date: newDate
            },
            headers: { access_token: localStorage.getItem('access_token') }
        })

            .done(response => {
                console.log('edit success!')
                $("#edit-todo-page").hide()
                $("#get-todo-page").show()
                getTodos()
            })
            .fail(response => {
                console.log('edit failed!', response)

            })
            .always(() => {
                console.log('edit finished!')
            })

    })
    $("#qr-back").click(() => {
        $("#qrcode").hide()
        $("#get-todo-page").show()
    })
})





function onSignIn(googleUser) {
    console.log('onSignIn')
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/google-signin',
        data: { id_token: id_token } // dikirim ke request body
    })
        .done(function (data) {
            console.log(data, 'ini dataaaa')
            localStorage.setItem('access_token', data.access_token)
            $('#login-page').hide()
            $('#get-todo-page').show()
            getTodos()
        })
        .fail(function (response) {
            console.log('failedsssssss', response)
        })
        .always(function (response) {
            console.log('finished!')
        })

}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('access_token')
}

function getTodos() {
    // console.log(localStorage.getItem('access_token'))
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/todos",
        headers: { access_token: localStorage.getItem('access_token') }
    })
        .done(function (response) {
            console.log('ini data', response)
            let eachTodo = ''
            response.forEach((todo) => {
                let changeStatus = ''
                if (todo.status == true) {
                    changeStatus = 'Done'
                }
                else {
                    changeStatus = 'Not Done'
                }
                let date = todo.due_date.split("T")
                let onlyDate = date[0]
                eachTodo += `
                <tr>
                <td>${todo.title}</td>
                <td>${todo.description}</td>
                <td>${changeStatus}</td>
                <td>${onlyDate}</td>
                <td><button onClick ="getEditTodo(${todo.id})">Edit</button> | <button data-toggle="modal" data-target="#exampleModal" data-id="${todo.id}" id="modal-delete">Delete</button> | <button id="qr-code" data-title="${todo.title}">QR Code </button></td>
                </tr>`
            })
            $('#table-todo').html(eachTodo)
            console.log(eachTodo)

        })
        .fail(function (response) {
            console.log(response)
            console.log('failed!', '>>>>', response)
        })
        .always(function () {
            console.log('finished!')
        })
}

function deleteTodo(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/todos/${id}`,
        headers: { access_token: localStorage.getItem('access_token') }
    })
        .done(response => {
            console.log('deleted')
            getTodos()
            $("#exampleModal").modal('hide')
        })
        .fail(response => {
            console.log('delete failed!', response)
        })

        .always(() => {
            console.log('delete finished!')
        })
}
function getEditTodo(id) {
    todoId = id
    console.log(id)
    // console.log(`clicked! iduser: ${id}`)
    $("#get-todo-page").hide()
    $("#edit-todo-page").show()
    //get utk ambil value 
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/todos/${id}`,
        headers: { access_token: localStorage.getItem('access_token') }
    })
        .done(response => {
            const date = response.due_date.split("T")
            // console.log(date)
            console.log('get data!', response)
            $("#edit-title").val(response.title)
            $("#edit-desc").val(response.description)
            $("#edit-due-date").val(date[0])
            $("#edit-status").empty()
            const optionTrue = `<option value="true" selected>Done</option>
                            <option value="false"> Not Done </option>`
            const optionFalse = `<option value="true">Done</option>
        <option value="false"selected> Not Done </option>`
            if (response.status == true) {
                $("#edit-status").append(optionTrue)
            } else {
                $("#edit-status").append(optionFalse)
            }

        })
        .fail(response => {
            console.log('get data failed!', response)
        })
        .always(() => {
            console.log('get data finished!')
        })
}

function check() {
    if (!localStorage.getItem('access_token')) {
        $("#login-page").show()
    } else {
        $("#get-todo-page").show()
    }
}