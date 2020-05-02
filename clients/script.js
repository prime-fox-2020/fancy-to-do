let the_url = 'http://localhost:3000'

function getIndonesianDate(value) {
    let year = value.substring(0,4)
    let month = value.substring(5,7)
    let date = value.substring(8,10)
    let tanggal_lengkap = null
    if (date && month && year) {
        switch (Number(month)) {
            case 01: {tanggal_lengkap = `${date} Januari ${year}`; break;}
            case 02: {tanggal_lengkap = `${date} Februari ${year}`; break;}
            case 03: {tanggal_lengkap = `${date} Maret ${year}`; break;}
            case 04: {tanggal_lengkap = `${date} April ${year}`; break;}
            case 05: {tanggal_lengkap = `${date} Mei ${year}`; break;}
            case 06: {tanggal_lengkap = `${date} Juni ${year}`; break;}
            case 07: {tanggal_lengkap = `${date} Juli ${year}`; break;}
            case 08: {tanggal_lengkap = `${date} Agustus ${year}`; break;}
            case 09: {tanggal_lengkap = `${date} September ${year}`; break;}
            case 10: {tanggal_lengkap = `${date} Oktober ${year}`; break;}
            case 11: {tanggal_lengkap = `${date} November ${year}`; break;}
            case 12: {tanggal_lengkap = `${date} Desember ${year}`; break;}
            default: {tanggal_lengkap = 'Maaf data yang anda masukan tidak valid!';}
        }
    } 
    return tanggal_lengkap
}

$(document).ready(function() {    
    if (localStorage.token) {
        $('#dashboard').show() 
        $('#todos-nav').show()
        $('#register-nav').show()
        $('#logout').show()
        $('#login-page').hide()
        $('#register-page').hide()
        $('#edit-page').hide()
        $('#add-page').hide()
        $('#calendar-page').hide()
        $('#login-nav').hide()
        getAllTodos()
    } else if (!localStorage.token) {
        $('#register-page').show()
        $('#login-nav').show()
        $('#logout').hide()
        $('#dashboard').hide()
        $('#edit-page').hide()
        $('#add-page').hide()
        $('#login-page').hide()
        $('#calendar-page').hide()
        $('#todos-nav').hide()
    }

    $('#cancel-edit-form').click(function(event) {
        $('#dashboard').show() 
    })

    $('#cancel-add-form').click(function(event) {
        $('#dashboard').show() 
    })

    $('#back-to-dashboard').click(function(event) {
        $('#dashboard').show() 
    })

    $('#cancel-login-form').click(function(event) {
        event.preventDefault()
        $('#register-page').show()
        $('#login-page').hide()
    })

    $('#cancel-register-form').click(function(evebt) {
        event.preventDefault()
        if (localStorage.token) {
            $('#dashboard').show() 
            $('#register-page').hide()
        } else if (!localStorage.token) {
            $('#login-page').show()
            $('#register-page').hide()
        }

    })


    $('#todos-nav').click(function(event) {
        if (localStorage.token) {
            $('#dashboard').show() 
            $('#login-page').hide()
            $('#register-page').hide()
            $('#edit-page').hide()
            $('#add-page').hide()
            $('#calendar-page').hide()
            $('#login-nav').hide()
            getAllTodos()
        } else if (!localStorage.token) {
            $('#register-page').show()
            $('#login-nav').show()
            $('#dashboard').hide()
            $('#edit-page').hide()
            $('#add-page').hide()
            $('#login-page').hide()
            $('#calendar-page').hide()
        }
    })

    $('#register-nav').click(function(event) {
        event.preventDefault()
        if (localStorage.token) {
            $('#dashboard').hide() 
            $('#login-page').hide()
            $('#register-page').show()
            $('#logout').show()
            $('#edit-page').hide()
            $('#add-page').hide()
            $('#calendar-page').hide()
            $('#login-nav').hide()
            getAllTodos()
        } else if (!localStorage.token) {
            $('#register-page').show()
            $('#login-nav').show()
            $('#logout').hide()
            $('#dashboard').hide()
            $('#edit-page').hide()
            $('#add-page').hide()
            $('#login-page').hide()
            $('#calendar-page').hide()
        }
    })
    
    $('#login-nav').click(function(event) {
        event.preventDefault()
        console.log('login di nav bar ter click');
        $('#login-page').show()
        $('#register-page').hide()
        $('#dashboard').hide()
    })

    $('#logout').click(function(event) {
        // event.preventDefault()
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.clear()
            $('#login-page').hide()
            $('#dashboard').hide()
        });
    })

    $('#holidays-button').click(function(event) {
        event.preventDefault(event)
        console.log('masuk holidays calendar');
        showCalendarHolidays()
    })
    
    // Mengambil elemen html dengan id add-todos-button untuk mengganti page  
    $('#add-todos-button').click(function(event) {
        event.preventDefault(event)
        $('#add-page').show()
        $('#dashboard').hide()
    })

    // Mengambil elemen html dengan class edit-this-todo dengan event click
    $(document).on("click", "#edit-this-todo", function(event) {
        event.preventDefault()
        let id = $(this).attr('data-id')
        const token = localStorage.getItem('token')
        $.ajax({
            method: 'GET',
            url: the_url + '/todos/' + id,
            headers: {
                token
            }
        })
        .done(data => {
            $('#title-edit').val(data.title)
            $('#description-edit').val(data.description)
            $('#status-edit').val(data.status)
            $('#due-date-edit').val(data.due_date)
        })
        .fail(err => {
            console.log(err, `tidak dapat mencari todo dengan id ${id}`);
            $('#edit-error').text(err.responseJSON.msg)
            
        })
        .always(function() {
        })
        $('#edit-page').show()
        $('#dashboard').hide()
        $('#form-edit').submit(function(event) {
            // event.preventDefault()
            let judul = $('#title-edit').val()
            let deskripsi = $('#description-edit').val()
            let statusnya = $('#status-edit').val()
            let jatuh_tempo = $('#due-date-edit').val()
            updateTodo(judul, deskripsi, statusnya, jatuh_tempo, id)
        })            
    })

    // Mengambil elemen html dengan class delete-this-todo dengan event click
    $(document).on("click", "#delete-this-todo", function() {
        event.preventDefault()
        let id = $(this).attr('data-id')        
        deleteTodo(id)  
    })

    // Mengambil elemen html dengan id form-registrasi
    $('#form-register').submit(function( event ) {
        event.preventDefault();
        let name = $('#name-register').val()
        let username = $('#username-register').val()
        let email = $('#email-register').val()
        let password = $('#password-register').val() 
        $('#register-error').hide()
        // ajax untuk user register
        register(name, username, email, password)
    });

    // Mengambil elemen html dengan id form-login
    $('#form-login').submit(function(event) {
        event.preventDefault()
        let usrname = $('#username-login').val()
        let eml = $('#email-login').val()
        let pswd = $('#password-login').val()
        login(usrname, eml, pswd)
    })

    // Mengambil elemen html dengan id form-add
    $('#form-add').submit(function(event) {
        event.preventDefault()
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
            url: the_url + '/todos',
            headers: {
                token
            },
            data: {
                title: title,
                description: description,
                status: status,
                due_date: due_date
            }
        })
        .done(data => {
            $("#todo-list").append(`
                    <tr>
                        <td id="title">${data.title}</td>
                        <td id="description">${data.description}</td>
                        <td id="status">${data.status}</td>
                        <td id="due-date">${getIndonesianDate(data.due_date)}</td>
                        <td><button class="waves-effect waves-light btn" id="edit-this-todo" data-id="${data.id}">EDIT</button></td>
                        <td><button class="waves-effect waves-light btn" id="delete-this-todo" data-id="${data.id}">DELETE</button></td>
                    </tr>`)
            getAllTodos()
            $('#dashboard').show()
            $('#add-page').hide() 
            $('#pesan').text(data.message)
        })
        .fail(err => {
            console.log(err, 'tidak dapat menambahkan todo');
            $('#add-error').text(err.responseJSON.msg)
            
        })
        .always(function() {
            $('#title-add').val('')
            $('#description-add').val('')
            $('#status-add').val('')
            $('#due-date-add').val('')
        })
    }

    // Request put dengan menggunakan ajax untuk mengupdate/edit todo
    function updateTodo(title, description, status, due_date, todo_id) {
        const token = localStorage.getItem('token')
        $.ajax({
            method: 'PUT',
            url: the_url + '/todos/' + todo_id,
            headers: {
                token
            },
            data: {
                title: title,
                description: description,
                status: status,
                due_date: due_date
            }
        })
        .done(data => {
            location.reload(true);
            $('#pesan').text(data.message)
            $('#dashboard').show()
            $('#edit-page').hide() 
        })
        .fail(err => {
            console.log(err, 'tidak dapat meng edit todo');
            $('#edit-error').text(err.responseJSON.msg)            
        })
        .always(function() {
            $('#title-edit').val()
            $('#description-edit').val()
            $('#status-edit').val()
            $('#due-date-edit').val()
        })
    }

    // Request get dengan menggunakan ajax untuk membaca semua daftar todo sesuai dengan UserId
    function getAllTodos() {
        const token = localStorage.getItem('token')
        $.ajax({
            method: 'GET',
            url: the_url + '/todos',
            headers: {
                token
            }
        })
        .done(data => {
            $('#username').text(localStorage.getItem('user_name'))
            $('#todo-list').empty()
            for (let i in data) {
                $("#todo-list").append(`
                    <tr>
                        <td id="title">${data[i].title}</td>
                        <td id="description">${data[i].description}</td>
                        <td id="status">${data[i].status}</td>
                        <td id="due-date">${getIndonesianDate(data[i].due_date)}</td>
                        <td><button class="waves-effect waves-light btn" id="edit-this-todo" data-id="${data[i].id}">EDIT</button></td>
                        <td><button class="waves-effect waves-light btn" id="delete-this-todo" data-id="${data[i].id}">DELETE</button></td>
                    </tr>
                `)
            }            
        })
        .fail(err => {
            console.log(err, 'tidak dapat mendapatkan data todos');
        })
        .always(function() {

        })
    }

    // Request post untuk login user
    function login(username, email, password) {
        $.ajax({
            method: 'POST',
            url: the_url + '/users/login',
            data: {
                username: username,
                email: email,
                password: password
            }
        })
        .done(data => {
            const token = data.user_token 
            localStorage.setItem('token', token)
            localStorage.setItem('user_name', data.user_name)
            $('#login-error').hide() 
            $('#login-page').hide() 
            $('#calendar-page').hide()
            $('#register-page').hide()
            $('#login-nav').hide()
            $('#pesan').hide()
            $('#dashboard').show()
            $('#logout').show()
            $('#todos-nav').show()
            getAllTodos()
        })
        .fail(err => {
            $('#login-error').show() 
            $('#login-error').text(err.responseJSON.err)
        })
        .always(function() {
            $('#username-login').val()
            $('#email-login').val()
            $('#password-login').val()
        })
    }
    
    // Request post untuk registrasi user baru
    function register(nm, usrname, eml, pswd) {
        $.ajax({
            method: 'POST',
            url: the_url + '/users/register',
            data: {
                name: nm, 
                username: usrname,
                email: eml, 
                password: pswd
            }
        })
        .done(data => {
            $('#register-error').hide() 
            $('#register-page').hide() 
            $('#login-page').show() 
        })
        .fail(err => {
            $('#register-error').show() 
            $('#register-error').text(err.responseJSON.msg) 
        })
        .always(function() {
            $('#name-register').val()
            $('#username-register').val()
            $('#email-register').val()
            $('#password-register').val()
        })
    }

    // Request delete untuk mendelet todo sesuai dengan todo_id
    function deleteTodo(todo_id) {
        const token = localStorage.getItem('token')
        $.ajax({
            method: 'DELETE',
            url: the_url + '/todos/' + todo_id,
            headers: {
                token
            }
        })
        .done(data => {
            $('#pesan').text(data.message)
            getAllTodos()
            $("#dashboard").show()
        })
        .fail(err => {
            console.log(err, 'tidak dapat mendelete todo');
            $('#edit-error').text(err.responseJSON.msg)
            
        })
        .always(function() {
        })
    }

    function showCalendarHolidays() {
        $.ajax({
            method: 'GET',
            url: the_url + '/holidays',
            params: {
                api_key: 'fc24d16705399cb231e56807dfd018bcf351b8e3',
                country: 'ID',
                year: 2020
            }
        })
        .done(data => { 
            data = data.response.response.holidays
            // console.log(data);            
            $('#holidays-list').empty()
            for (let i in data) {
                $("#holidays-list").append(`
                    <tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].description}</td>
                        <td>${getIndonesianDate(data[i].date.iso.slice(0,10))}</td>
                    </tr>
                `)
            }            
            $('#calendar-page').show()
            $('#dashboard').hide()
        })
        .fail(err => {
            console.log(err, "Tidak dapat memproses calendar");
            
        })
        .always(function() {
            console.log('Memproses data calendar');
        })
    }
    
});


function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;    
    $.ajax({
        url: `${the_url}/users/google-login`,
        method: 'POST',
        headers: {
            google_token: id_token 
        }  
    })
    .done(data=> {
        localStorage.setItem('token', data.user_token)
        localStorage.setItem('user_name', data.user_name)
        $('#dashboard').show()
        $('#logout').show()
        $('#todos-nav').show()
        $('#login-error').hide() 
        $('#login-page').hide() 
        $('#calendar-page').hide()
        $('#register-page').hide()
        $('#login-nav').hide()
    })
    .fail(err=> {
        console.log(err);
    })
}

function myFunction() {
    var x = document.getElementById("password-register");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function myFunction() {
    var x = document.getElementById("password-login");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}