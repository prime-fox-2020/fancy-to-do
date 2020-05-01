// import { json } from "express";
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/google-signIn",
        data: { id_token }
    })
        .done(function (msg) {
            console.log(msg.access_token)
            localStorage.setItem('access_token', msg.access_token);
        });
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


$(document).ready(function () {
    let isLogin = false;
    $("#home").hide()
    $("#form_register").hide()


    $("#login" || "#logout" || "#login_google").click(function (e) {
        e.preventDefault();
        const email = $("#email").val();
        const password = $("#password").val();
        
        if (isLogin) {
            $("#home").hide();
            $("#form").show();
            isLogin = false;
        } else {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/users/login',
                dataType: 'json',
                data: { email, password }
            })
                .done(function () {
                    $("#form").hide();
                    $("#home").show();
                    isLogin = true;
                })
        }
    })

    $("#register").click(function (e) {
        e.preventDefault();
        $("#form_login").hide()
        $("#form_register").show()
    })

    $("#submit_register").click(function (e) {
        e.preventDefault();

        let result = {
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            email: $("#email_form").val(),
            password: $("#password_form").val()
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/users/register',
            dataType: 'json',
            data: result
        })
            .done(function () {
                console.log('SUCCESS')
                $("#form_register").hide()
                $("#form_login").show()
            })
            .fail(function (err) {
                console.log(err)
                console.log('ERRR')
            })
            .always(function () {
                console.log('ALWAYS')
            })
    })

    $("#input_data").click(function (e) {
        e.preventDefault();
        let input = $("#input_todo").val();

        if (input !== "") {
            $(".list-group").append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${input}
                <span class="badge badge-primary badge-pill">1</span>
            </li>`);
            $("#input_todo").val("");
        }
    })

})