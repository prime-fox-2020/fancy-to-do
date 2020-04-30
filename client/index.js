// import { json } from "express";
function onSignIn(googleUser) {
    // console.log(googleUser.getBasicProfile())
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;

    // alert(id_token)
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/google-signIn",
        data: { id_token }
      })
        .done(function( msg ) {
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
    $("#login" || "#logout").click(function (e) {
        e.preventDefault();
        if (isLogin) {
            $("#home").hide();
            $("#form").show();
            isLogin = false;
        } else {
            $("#form").hide();
            $("#home").show();
            isLogin = true;
        }
    })

    $("#register").click(function (e) {
        e.preventDefault();
        $("#form_login").hide()
        $("#form_register").show()
    })

    $("submit_register").click(function (e) {
        e.preventDefault();
        $("#form_register").hide()
        $("#form_login").show()
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
        // console.log($("i").get())
        $("#check").remove();
    })

    $("#submit_register").click(function (e) {
        e.preventDefault();

        const data = $("#form_register").serializeArray()
        let result = {}
        data.forEach(el => {
            result[el.name] = el.value
        });
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/users/register',
            dataType: 'json',
            data: result
        })
            .done(function () {
                console.log('SUCCESS')
            })
            .fail(function (err) {
                console.log(err)
                console.log('ERRR')
            })
            .always(function () {
                console.log('ALWAYS')
            })
    })

    // $.ajax({
    //     type: 'GET',
    //     url: 'http://localhost:3000/todos'
    // })
    // .done(function (){
    //     console.log('SUCCESS')
    // })
    // .fail(function (err){
    //     console.log('FAILED')
    //     console.log(err)
    // })
    // .always(function (){
    //     console.log('ALWAYS')
    // })
})