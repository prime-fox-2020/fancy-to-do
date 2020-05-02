let url_nya = 'http://localhost:3000'

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
                $('#edit-date').val(data.due_date)
            })
            .fail(err => {
                console.log(err, `tidak dapat mencari todo dengan id ${id}`);
                $('#edit-error').text(err.responseJSON.msg)
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
            let jatuh_tempo = $('#edit-date').val()
            updateTodo(judul, deskripsi,  jatuh_tempo, id)
        })
    })    // Mengambil elemen html dengan class delete-this-todo dengan event click
    $(document).on("click", ".delete-this-todo", function () {
        event.preventDefault()
        console.log(".delete-this-todo ke click", this);
        console.log($(this).attr('data-id'));
        let id = $(this).attr('data-id')
        console.log('Masuk delete todo');
        deleteTodo(id)
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
        console.log(email,pswd)
    })    // Mengambil elemen html dengan id form-add
    $('#add-button').submit(function (event) {
        event.preventDefault()
        console.log('Masuk add todo');
        let judul = $('#add-title').val()
        let deskripsi = $('#add-desc').val()
        let statusnya = "Ongoing"
        let jatuh_tempo = $('#add-date').val()
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
                        <td>${data.due_date.slice(0,10)}</td>
                        <td><button class="btn btn-sm btn-primary mx-1 change-this-todo" data-id="${data.id}">DONE THIS!</button>
                        <button class="btn btn-sm btn-info mx-1 edit-this-todo" data-id="${data.id}">EDIT</button>
                        <button class="delete-this-todo float-right btn btn-danger btn-sm mx-1" data-id="${data[i].id}">DELETE</button></td>                    </tr>
                `)
                $('#content').show()
                $('#form-add').hide()
            })
            .fail(err => {
                console.log(err, 'tidak dapat menambahkan todo');
                $('#add-error').text(err.responseJSON.msg)
            })
            .always(function () {
                $('#add-title').val('')
                $('#add-desc').val('')
                $('#add-date').val('')
            })
    }    // Request put dengan menggunakan ajax untuk mengupdate/edit todo
    function updateTodo(title, description, due_date, todo_id) {
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
                due_date: due_date
            }
        })
            .done(data => {
                // console.log(data.todo);
                $('#content').show()
                $('#form-edit').hide()
            })
            .fail(err => {
                console.log(err, 'tidak dapat meng edit todo');
                $('#edit-error').text(err.responseJSON.msg)
            })
            .always(function () {
                $('#edit-title').val('')
                $('#edit-desc').val('')
                $('#edit-date').val('')
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
                        <td> <button class="btn btn-sm btn-primary mx-1 change-this-todo" data-id="${data.id}">DONE THIS!</button>
                        <button class="edit-this-todo  btn btn-info btn-sm mx-1" data-id="${data[i].id}">EDIT</button>
                        <button class="delete-this-todo float-right btn btn-danger btn-sm mx-1" data-id="${data[i].id}">DELETE</button></td>
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
                $('#form-login').hide()
                $('#calendar-page').hide()
                $('#form-register').hide()
                $('#content').show()
                getAllTodos()
            })
            .fail(err => {
                console.log(err, "Login error");
                $('#login-error').show()
                $('#login-error').text(err.responseJSON.err)
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
                $('#register-error').hide()
                $('#form-register').hide()
                $('#form-login').show()
            })
            .fail(err => {
                console.log(err.responseJSON.msg, "Registrasi error");
                $('#register-error').show()
                $('#register-error').text(err.responseJSON.msg)
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
                console.log(data);
                $("#content").show()
            })
            .fail(err => {
                console.log(err, 'tidak dapat mendelete todo');
                $('#edit-error').text(err.responseJSON.msg)
            })
            .always(function () {
            })
    }
    $('#nav-logout').click(function (event) {
        event.preventDefault()
        localStorage.clear()
        $('#form-login').show()
        $('#content').hide()
    })
});