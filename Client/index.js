
    $("#status").hide()
    $('#theEdit').hide()
    $('#todos_add').hide()
    
    
    if(!localStorage.access_token){
        $('#registration').show()
        $('#login').show()
        $('#todos_table').hide()
    } else{
        $('#registration').hide()
        $('#login').hide()
        $('#todos_table').show()
        $('#logoutButton').show()
        getToDo()
    }
                                                $(document).ready(function () {

    

    $("#addSomeTodo").click(function() {
        $('#todos_add').show()
      });

    $("#logoutButton").click(function() {
        logout()
      });



    //Register -------------------------------
    $('#formRegister').submit(function (e) {
        e.preventDefault()
        let formInput = { email: $('#emailRegis').val(), password: $('#passRegis').val() }

        for (let key in formInput) {
            if (formInput[key] == "") {
                delete formInput[key]
            }
        }
        console.log(formInput)

        // data regist ke database
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/register",
            data: formInput
        })
            .done(data => {
                console.log(data)
                $("#statusRegister").html('Registrasi Sukses').addClass("btn-success").removeClass("btn-warning").show()
                $("#formRegister")[0].reset()
            })
            .fail(err => {
                console.log(err)
                $("#statusRegister").html('Kolom belum lengkap').addClass("btn-warning").removeClass("btn-success").show()
                $("#formRegister")[0].reset()
            })
            .always(() => {
                console.log('proses ini berjalan')
            })

    })

    //Login ---------------------------
    $(formLogin).submit(e => {
        e.preventDefault()
        let formInput = { email: $('#emailLogin').val(), password: $('#passLogin').val() }
        console.log(formInput)

        //data login ke database
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/login",
            data: formInput
        })
            .done(data => {
                console.log(data)
                localStorage.setItem("access_token", data.access_token)
                $("#registration").hide()
                $("#login").hide()
                $('#todos_table').show()
                getToDo()

                // tarik data todos dari database

            })
            .fail(err => {
                console.log(err)
                $("#statusLogin").html('Email Atau Password Salah').addClass("btn-warning").removeClass("btn-success").show()
            })
            .always(() => {
                console.log('proses ini berjalan')
            })
    })

    $("#edit-form").submit(function (e) {
        e.preventDefault()
        console.log(todoId)
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
                access_token : localStorage.getItem('access_token')
            }
        })
        .done(data => {
            check()
        })
        .fail(err => {
            console.log(err)
        })
    })

    $("#add-todos-form").submit(function (e) {
        e.preventDefault()
        const title = $("#input-todos-title").val()
        const description = $('#input-todos-description').val()
        const status = $('#input-todos-status').val()
        const due_date = $('#input-todos-due_date').val()
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/todos',
            data: {
                title: title,
                description: description,
                status: status,
                due_date: due_date
            },
            headers: {
                access_token : localStorage.getItem('access_token')
            }
        })
        .done(function (response) {
            $('#input-todos-title').val('')
            $('#input-todos-description').val('')
            $('#input-todos-status').val('')
            $('#input-todos-due_date').val('')

            console.log('sukses menambahkan')
            getToDo()
            $('#todos_add').hide()
        })
        .fail(err => {
            console.log(err)
        })
        .always(function (response) {
            console.log('Berjalan dari add Todo')
        })
    })

    







})


// Function Library
let todoId;
function getId(id) {
    todoId = id
    return todoId
}
    
 function getTodoById(id) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(data => {
            let todo = data
            $('#edit-form').empty()
            let newForm = `
                        <label for="">Title :</label>
                        <input type="text" name="title" id="edit-title" value="${todo.title}"><br>
                        <label for="">Description :</label>
                        <input type="text" name="description" id="edit-description" value="${todo.description}"><br>
                        <label for="">Status :</label>
                        <input type="text" name="status" id="status-description" value="${todo.status}"><br>
                        <label for="">Due Date :</label>
                        <input type="text" name="due_date" id="edit-due_date" value="${todo.due_date}"><br>
                        <button type="submit">Save</button>
                        <a class="btn btn-danger btn-sm" href="#" role="button" onclick="$('#theEdit').hide()">Cancel</a>
                        `
            $('#edit-form').append(newForm)
            getId(data.id)
            console.log(data.id)
            $("#theEdit").show()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log('proses ini berjalan dari ById')
        })
}



function getToDo() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/todos",
        headers: { access_token: localStorage.getItem("access_token") }
    })
        .done(data => {
            console.log(data)
            data.forEach(data => {
                let new_row = `
                                <tr>
                                <td>${data.title}</td>
                                <td>${data.description}</td>
                                <td>${data.status}</td>
                                <td>${data.due_date}</td>
                                <td><a class="btn btn-warning" type="button" value="click" onClick="getTodoById(${data.id})" >Edit</a> | <a class="btn btn-danger btn-sm" href="#" role="button" onclick="deleteTodo(${data.id})">Delete</a></td>
                                </tr>`
                $('#todosbody').append(new_row)
            })
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log('proses ini berjalan')
        })

    $('#todosbody').empty();
    
}

function check(){
    location.reload(true)
}

function deleteTodo (id) {
    console.log(id)
    $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/todos/${id}`,
        headers: { access_token: localStorage.getItem("access_token") }
    })
    .done(data => {
        check()
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        console.log('proses ini berjalan dari delete')
    })
}

function logout() {
    localStorage.removeItem("access_token")
    if(!localStorage.access_token){
        $('#registration').show()
        $('#login').show()
        $('#todos_table').hide()
    } else{
        $('#registration').hide()
        $('#login').hide()
        $('#todos_table').show()
        $('#logoutButton').show()
        getToDo()
    }
    // check()
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut()
    // .then(function () {
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
  }
  

// Function Library End