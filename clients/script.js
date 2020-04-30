let url_nya = 'http://localhost:3000'

$(document).ready(function() {
    console.log('Hallo Jquery World!!');  
    $('#register-page').hide()
    // $('#login-page').hide()
    $('#dashboard').hide()


    $('#form-login').submit(function(event) {
        event.preventDefault()
        console.log('masuk login submit');

        console.log($('#username-login').val());
        console.log($('#email-login').val());
        console.log($('#password-login').val());

        let username = $('#username-login').val()
        let email = $('#email-login').val()
        let password = $('#password-login').val()
       
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
            console.log(data, 'berhasil registrasi!!');
            const token = data.user_token 
            localStorage.setItem('token', token)
            console.log(data.user_token);
            $('#login-error').hide() 
            $('#login-page').hide() 
            $('#dashboard').show()
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
        
    })

    $('#form-register').submit(function( event ) {
        event.preventDefault();
        console.log('masuk register submit');
                
        let name = $('#name-register').val()
        let username = $('#username-register').val()
        let email = $('#email-register').val()
        let password = $('#password-register').val() 
        $('#register-error').hide()

        // ajax untuk user register
        $.ajax({
            method: 'POST',
            url: url_nya + '/users/register',
            data: {
                name: name, 
                username: username,
                email: email, 
                password: password
            }
        })
        .done(data => {
            console.log(data, 'berhasil registrasi!!');
            $('#register-error').hide() 
            $('#register-page').hide() 

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
    });

});