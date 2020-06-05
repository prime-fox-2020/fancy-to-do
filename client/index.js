let url_nya = 'http://localhost:3000'


function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)
    $.ajax({
        method: 'POST',
        url: url_nya + '/user/google',
        data: {
            id_token: id_token
        }
    }).done(data => {
        console.log(data)
        localStorage.setItem('token', data.access_token)
        $('#login-error').hide()
        $('#form-login').hide()
        $('#calendar-page').hide()
        $('#form-register').hide()
        $('#content').show()
        $('#nav-logout').show()
        $('#nav-login').hide()
        $('#nav-register').hide()
        getAllTodos()

    })
}
// Request post dengan menggunakan ajax untuk menambah todo
function addTodo(title, description, status, due_date) {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'POST',
        url: url_nya + '/todos',
        headers: {
            access_token: token
        },
        data: {
            title: title,
            description: description,
            status: status,
            due_date: due_date
        }
    })
        .done(data => {

            console.log(data);
            $("#todo-list").append(`
                <tr>
                    <td>${data.title}</td>
                    <td>${data.description}</td>
                    <td>${data.status}</td>
                    <td>${data.due_date.slice(0, 10)}</td>
                    <td><button class="btn btn-sm btn-info mx-1 edit-this-todo" data-id="${data.id}">EDIT</button>
                    <button class="delete-this-todo float-right btn btn-danger btn-sm mx-1" data-id="${data.id}">DELETE</button></td>                    </tr>
            `)
            Swal.fire({
                icon: 'success',
                text: "Todo has been added!"
            })
            $('#content').show()
            $('#form-add').hide()

            $('#add-title').val('')
            $('#add-desc').val('')
            $('#add-date').val('')
        })
        .fail(err => {
            console.log(err, 'tidak dapat menambahkan todo');
            Swal.fire({
                icon: 'error',
                title: 'Add error',
                text: err.responseJSON.message
            })
        })
        .always(function () {
        })
}    // Request put dengan menggunakan ajax untuk mengupdate/edit todo
function updateTodo(title, description, due_date, status,todo_id) {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'PUT',
        url: url_nya + '/todos/' + todo_id,
        headers: {
            access_token: token
        },
        data: {
            title: title,
            description: description,
            due_date: due_date,
            status : status
        }
    })
        .done(data => {
            Swal.fire({
                icon: 'success',
                text: "Todo has been updated!"
            })
            $('#todo-list').empty()
            $('#content').show()
            $('#form-edit').hide()
            getAllTodos()

            $('#edit-title').val('')
            $('#edit-desc').val('')
            $('#edit-date').val('')
        })
        .fail(err => {
            console.log(err, 'tidak dapat meng edit todo');
            Swal.fire({
                icon: 'error',
                title: "Update error!",
                text: err.responseJSON.message
            })
        })
        .always(function () {
        })
}    // Request get dengan menggunakan ajax untuk membaca semua daftar todo sesuai dengan UserId
function getAllTodos() {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'GET',
        url: url_nya + '/todos',
        headers: {
            access_token: token
        }
    })
        .done(data => {
            console.log(data);
            $('#todo-list').empty()
            for (let i in data) {
                $("#todo-list").append(`
                <tr>
                    <td id="title">${data[i].title}</td>
                    <td id="description">${data[i].description}</td>
                    <td id="status">${data[i].status}</td>
                    <td id="due-date">${data[i].due_date.slice(0, 10)}</td>
                    <td><button class="edit-this-todo  btn btn-info btn-sm mx-1" data-id="${data[i].id}">EDIT</button>
                    <button class="delete-this-todo float-right btn btn-danger btn-sm mx-1" data-id="${data[i].id}">DELETE</button></td>
                </tr>
            `)
            }
        })
        .fail(err => {
            console.log(err, 'tidak dapat mendapatkan data todos');
        })
        .always(function () { })
}
// Request post untuk login user
function login(email, password) {
    $.ajax({
        method: 'POST',
        url: url_nya + '/user/login',
        data: {
            email: email,
            password: password
        }
    })
        .done(data => {
            console.log('berhasil login!!');
            const token = data.access_token
            localStorage.setItem('token', token)
            console.log(data.access_token);
            Swal.fire({
                icon: 'success',
                text: "Login done!"
            })
            $('#login-error').hide()
            $('#form-login').hide()
            $('#calendar-page').hide()
            $('#form-register').hide()
            $('#content').show()
            $('#nav-logout').show()
            $('#nav-login').hide()
            $('#nav-register').hide()
            getAllTodos()
        })
        .fail(err => {
            console.log(err, "Login error");
            Swal.fire({
                icon: 'error',
                title: "Login error!",
                text: err.responseJSON.message
            })
        })
        .always(function () {
            $('#login-email').val('')
            $('#login-pwd').val('')
        })
}    // Request post untuk registrasi user baru
function register(email, pswd) {
    $.ajax({
        method: 'POST',
        url: url_nya + '/user/register',
        data: {
            email: email,
            password: pswd
        }
    })
        .done(data => {
            console.log(data, 'berhasil registrasi!!');
            Swal.fire({
                icon: 'success',
                text: "Register done!"
            })
            $('#register-error').hide()
            $('#form-register').hide()
            $('#form-login').show()
        })
        .fail(err => {
            console.log(err.responseJSON.message, "Registrasi error");
            Swal.fire({
                icon: 'error',
                title: "Register error!",
                text: err.responseJSON.message
            })
        })
        .always(function () {
            $('#reg-email').val('')
            $('#reg-pwd').val('')
        })
}    // Request delete untuk mendelet todo sesuai dengan todo_id
function deleteTodo(todo_id) {
    const token = localStorage.getItem('token')
    $.ajax({
        method: 'DELETE',
        url: url_nya + '/todos/' + todo_id,
        headers: {
            access_token: token
        }
    })
        .done(data => {
            $('#todo-list').empty()
            getAllTodos()
            console.log(data);
            $("#content").show()
        })
        .fail(err => {
            console.log(err, 'tidak dapat mendelete todo');
            $('#edit-error').text(err.responseJSON.message)
        })
        .always(function () {
        })
}

$(document).ready(function () {
    console.log('Hallo Jquery World!!');
    if (localStorage.token) {
        $('#content').show()
        $('#form-login').hide()
        $('#form-register').hide()
        $('#form-edit').hide()
        $('#form-add').hide()
        $('#nav-logout').show()
        $('#nav-login').hide()
        $('#nav-register').hide()

        getAllTodos()
    } else if (!localStorage.token) {
        $('#content').hide()
        $('#form-edit').hide()
        $('#form-add').hide()
        $('#form-login').show()
        $('#form-register').show()
        $('#nav-logout').hide()
        $('#nav-login').show()
        $('#nav-register').show()
    }

    // Mengambil elemen html dengan id add-todos-button untuk mengganti page  
    $('#add-todos').click(function (event) {
        event.preventDefault(event)
        console.log('add todos right now');
        $('#form-add').show()
        $('#content').hide()
        $('#add-error').hide()

    })
    // Mengambil elemen html dengan class edit-this-todo dengan event click
    $(document).on("click", ".edit-this-todo", function (event) {
        event.preventDefault()
        let id = $(this).attr('data-id')
        const token = localStorage.getItem('token')
        $.ajax({
            method: 'GET',
            url: url_nya + '/todos/' + id,
            headers: {
                access_token: token
            }
        })
            .done(data => {
                console.log(data);
                $('#edit-title').val(data.title)
                $('#edit-desc').val(data.description)
                $('#edit-status').val(data.status)
                $('#edit-date').val(data.due_date.slice(0, 10))
            })
            .fail(err => {
                console.log(err, `tidak dapat mencari todo dengan id ${id}`);
                $('#edit-error').text(err.responseJSON.message)
            })
            .always(function () {
            })
        console.log(".edit-this-todo ke click", this);
        console.log($(this).attr('data-id'));
        $('#form-edit').show()
        $('#content').hide()
        $('#form-edit').submit(function (event) {
            event.preventDefault()
            console.log('Masuk edit todo');
            let judul = $('#edit-title').val()
            let deskripsi = $('#edit-desc').val()
            let statoes = $('#edit-status').val()
            let jatuh_tempo = $('#edit-date').val()
            updateTodo(judul, deskripsi, jatuh_tempo,  statoes, id)
        })
    })    // Mengambil elemen html dengan class delete-this-todo dengan event click
    $(document).on("click", ".delete-this-todo", function () {
        event.preventDefault()
        console.log(".delete-this-todo ke click", this);
        console.log($(this).attr('data-id'));
        let id = $(this).attr('data-id')
        console.log('Masuk delete todo');
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                deleteTodo(id)
            }
        })
    })
    // Mengambil elemen html dengan id form-registrasi
    $('#register-button').submit(function (event) {
        event.preventDefault();
        console.log('masuk register submit');
        let email = $('#reg-email').val()
        let password = $('#reg-pwd').val()
        $('#register-error').hide()
        register(email, password)
        // ajax untuk user register
    });
    // Mengambil elemen html dengan id form-login
    $('#login-button').submit(function (event) {
        event.preventDefault()
        console.log('masuk login submit');
        let email = $('#login-email').val()
        let pswd = $('#login-pwd').val()
        login(email, pswd)
        $('#user-name').text(`Welcome, ${email}!!`)
        console.log(email, pswd)
    })
    // Mengambil elemen html dengan id form-add
    $('#add-button').submit(function (event) {
        event.preventDefault()
        console.log('Masuk add todo');
        let judul = $('#add-title').val()
        let deskripsi = $('#add-desc').val()
        let statusnya = "Ongoing"
        let jatuh_tempo = $('#add-date').val()
        addTodo(judul, deskripsi, statusnya, jatuh_tempo)
    })

    $('#nav-logout').click(function (event) {
        event.preventDefault()
        Swal.fire({
            title: 'Logout?',
            text: "Are you sure?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout it!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Logout!',
                    'You have already logged out.',
                    'success'
                )

                localStorage.clear()
                // location.reload(true)
                const auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(() => {
                    $('#nav-logout').hide()
                    $('#nav-login').show()
                    $('#nav-register').show()
                    $('#form-register').show()

                    $('#todo-list').empty()

                    $('#content').hide()
                    $('#form-login').show()
                })
            }
        })
    })
});
