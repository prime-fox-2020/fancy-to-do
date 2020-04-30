let url_nya = 'http://localhost:3000'

$(document).ready(function() {

    console.log('Hallo Jquery World!!'); 
    if (localStorage.token) {
        $('#dashboard').show()
        $('#login-page').hide()
        $('#register-page').hide()
        getAllTodos()
    } else if (!localStorage.token) {
        $('#dashboard').hide()
        $('#login-page').show()
        $('#register-page').show()
    }

    
    $('#form-register').submit(function( event ) {
        event.preventDefault();
        console.log('masuk register submit');
                
        let name = $('#name-register').val()
        let username = $('#username-register').val()
        let email = $('#email-register').val()
        let password = $('#password-register').val() 
        $('#register-error').hide()
        register(name, username, email, password)
        // ajax untuk user register
    });

    $('#form-login').submit(function(event) {
        event.preventDefault()
        console.log('masuk login submit');
        let usrname = $('#username-login').val()
        let eml = $('#email-login').val()
        let pswd = $('#password-login').val()
        login(usrname, eml, pswd)
    })

    function getAllTodos() {
        const token = localStorage.getItem('token')
        $.ajax({
            method: 'GET',
            url: url_nya + '/todos',
            headers: {
                token
            }
        })
        .done(data => {
            console.log(data);
            for (let i in data) {
                $("#todo-list").append(`
                    <tr>
                        <td>${data[i].title}</td>
                        <td>${data[i].description}</td>
                        <td>${data[i].status}</td>
                        <td>${data[i].due_date}</td>
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

    function login(username, email, password) {
        $.ajax({
            method: 'POST',
            url: url_nya + '/users/login',
            data: {
                username: username,
                email: email,
                password: password
            }
        })
        .done(data => {
            console.log(data, 'berhasil login!!');
            const token = data.user_token 
            localStorage.setItem('token', token)
            console.log(data.user_token);
            $('#login-error').hide() 
            $('#login-page').hide() 
            $('#register-page').hide()
            $('#dashboard').show()
            getAllTodos()
        })
        .fail(err => {
            console.log(err, "Login error");
            $('#login-error').show() 
            $('#login-error').text(err.responseJSON.err)
        })
        .always(function() {
            $('#username-login').val()
            $('#email-login').val()
            $('#password-login').val()
        })
    }
    
    function register(nm, usrname, eml, pswd) {
        $.ajax({
            method: 'POST',
            url: url_nya + '/users/register',
            data: {
                name: nm, 
                username: usrname,
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
        .always(function() {
            $('#name-register').val()
            $('#username-register').val()
            $('#email-register').val()
            $('#password-register').val()
        })
    }

    
    $('#logout-button').click(function(event) {
        // event.preventDefault()
        localStorage.clear()
        $('#login-page').show()
        $('#dashboard').hide()
    })



});