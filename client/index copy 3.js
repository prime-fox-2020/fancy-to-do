let url_nya = 'http://localhost:3000'

$(document).ready(function () {
    console.log('Hallo Jquery World!!');
    if (localStorage.token) {
        $('#dashboard').show()
        $('#login-page').hide()
        $('#register-page').hide()
        $('#edit-page').hide()
        $('#add-page').hide()
        $('#calendar-page').hide()
        getAllTodos()
    } else if (!localStorage.token) {
        $('#dashboard').hide()
        $('#edit-page').hide()
        $('#add-page').hide()
        $('#login-page').show()
        $('#register-page').show()
        $('#calendar-page').hide()
    }
    // Mengambil elemen html dengan id add-todos-button untuk mengganti page  
    $('#add-todos-button').click(function (event) {
        event.preventDefault(event)
        console.log('add todos right now');
        $('#add-page').show()
        $('#dashboard').hide()
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
                $('#title-edit').val(data.title)
                $('#description-edit').val(data.description)
                $('#status-edit').val(data.status)
                $('#due-date-edit').val(data.due_date)
            })
            .fail(err => {
                console.log(err, `tidak dapat mencari todo dengan id ${id}`);
                $('#edit-error').text(err.responseJSON.msg)
            })
            .always(function () {
            })
        console.log(".edit-this-todo ke click", this);
        console.log($(this).attr('data-id'));
        $('#edit-page').show()
        $('#dashboard').hide()
        $('#form-edit').submit(function (event) {
            event.preventDefault()
            console.log('Masuk edit todo');
            let judul = $('#title-edit').val()
            let deskripsi = $('#description-edit').val()
            let statusnya = $('#status-edit').val()
            let jatuh_tempo = $('#due-date-edit').val()
            updateTodo(judul, deskripsi, statusnya, jatuh_tempo, id)
        })
    })    // Mengambil elemen html dengan class delete-this-todo dengan event click
    $(document).on("click", ".delete-this-todo", function () {
        event.preventDefault()
        console.log(".delete-this-todo ke click", this);
        console.log($(this).attr('data-id'));
        let id = $(this).attr('data-id')
        console.log('Masuk delete todo');
        deleteTodo(id)
    })    // Mengambil elemen html dengan id form-registrasi
    $('#form-register').submit(function (event) {
        event.preventDefault();
        console.log('masuk register submit');
        let email = $('#email-register').val()
        let password = $('#password-register').val()
        $('#register-error').hide()
        register(email, password)
        // ajax untuk user register
    });    // Mengambil elemen html dengan id form-login
    $('#form-login').submit(function (event) {
        event.preventDefault()
        console.log('masuk login submit');
        let eml = $('#email-login').val()
        let pswd = $('#password-login').val()
        login(eml, pswd)
    })    // Mengambil elemen html dengan id form-add
    $('#form-add').submit(function (event) {
        event.preventDefault()
        console.log('Masuk add todo');
        let judul = $('#title-add').val()
        let deskripsi = $('#description-add').val()
        let statusnya = $('#status-add').val()
        let jatuh_tempo = $('#due-date-add').val()
        addTodo(judul, deskripsi, statusnya, jatuh_tempo)
    })
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
                        <td>${data.due_date}</td>
                        <td><button class="edit-this-todo" data-id="${data.id}">EDIT</button></td>
                        <td><button class="delete-this-todo" data-id="${data.id}">DELETE</button></td>
                    </tr>
                `)
                $('#dashboard').show()
                $('#add-page').hide()
            })
            .fail(err => {
                console.log(err, 'tidak dapat menambahkan todo');
                $('#add-error').text(err.responseJSON.msg)
            })
            .always(function () {
                $('#title-add').val('')
                $('#description-add').val('')
                $('#status-add').val('')
                $('#due-date-add').val('')
            })
    }    // Request put dengan menggunakan ajax untuk mengupdate/edit todo
    function updateTodo(title, description, status, due_date, todo_id) {
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
                status: status,
                due_date: due_date
            }
        })
            .done(data => {
                // console.log(data.todo);
                $('#dashboard').show()
                $('#edit-page').hide()
            })
            .fail(err => {
                console.log(err, 'tidak dapat meng edit todo');
                $('#edit-error').text(err.responseJSON.msg)
            })
            .always(function () {
                $('#title-edit').val()
                $('#description-edit').val()
                $('#status-edit').val()
                $('#due-date-edit').val()
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
                for (let i in data) {
                    $("#todo-list").append(`
                    <tr>
                        <td id="title">${data[i].title}</td>
                        <td id="description">${data[i].description}</td>
                        <td id="status">${data[i].status}</td>
                        <td id="due-date">${data[i].due_date.slice(0, 10)}</td>
                        <td><button class="edit-this-todo" data-id="${data[i].id}">EDIT</button></td>
                        <td><button class="delete-this-todo" data-id="${data[i].id}">DELETE</button></td>
                    </tr>
                `)
                }
            })
            .fail(err => {
                console.log(err, 'tidak dapat mendapatkan data todos');
            })
            .always(function () { })
    }    // Request post untuk login user
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
                $('#login-error').hide()
                $('#login-page').hide()
                $('#calendar-page').hide()
                $('#register-page').hide()
                $('#dashboard').show()
                getAllTodos()
            })
            .fail(err => {
                console.log(err, "Login error");
                $('#login-error').show()
                $('#login-error').text(err.responseJSON.err)
            })
            .always(function () {
                $('#email-login').val()
                $('#password-login').val()
            })
    }    // Request post untuk registrasi user baru
    function register(eml, pswd) {
        $.ajax({
            method: 'POST',
            url: url_nya + '/user/register',
            data: {
                email: eml,
                password: pswd
            }
        })
            .done(data => {
                console.log(data, 'berhasil registrasi!!');
                $('#register-error').hide()
                $('#register-page').hide()
                $('#login-page').show()
            })
            .fail(err => {
                console.log(err.responseJSON.msg, "Registrasi error");
                $('#register-error').show()
                $('#register-error').text(err.responseJSON.msg)
            })
            .always(function () {
                $('#email-register').val()
                $('#password-register').val()
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
                console.log(data);
                $("#dashboard").show()
            })
            .fail(err => {
                console.log(err, 'tidak dapat mendelete todo');
                $('#edit-error').text(err.responseJSON.msg)
            })
            .always(function () {
            })
    }
    $('#logout-button').click(function (event) {
        event.preventDefault()
        localStorage.clear()
        $('#login-page').show()
        $('#dashboard').hide()
    })
});