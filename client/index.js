//Google sign in
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/google-signin",
        data: { id_token: id_token }
    })
        .done(function (data) {
            localStorage.setItem('access_token', data.access_token);
            $("#login-form").hide();
            $(".alert-danger").hide();
            showData(localStorage.getItem('access_token'));
        })
        .fail(err => {
            $(".alert-danger").text(err.responseJSON.message);
            $(".alert-danger").show();
        })
}

//sign-out
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('access_token');
    $("#login-form").show();
    $("#show-data").hide();
    $(".alert-danger").hide();
    $(".alert-success").hide();
}

//read data todos
const showData = (token) => {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/todos",
        headers: { access_token: token }
    })
        .done((data) => {
            const table = $("#todos");
            let todos = ``;
            for (let i in data) {
                todos += `<tr>
                <td>${data[i].title}</td>
                <td>${data[i].description}</td>
                <td>${data[i].due_date}</td>
                <td>${data[i].status}</td>
                <td>${data[i].UserId}</td>
                </tr>`
            }
            table.html(todos);
        })
    $("#show-data").show();
}

//jquery
$(document).ready(() => {
    //front page
    $("#show-data").hide();
    $("#register-button").css("color", "blue");
    $(".alert-danger").hide();
    $(".alert-success").hide();
    signOut();

    //To register page
    $("#register-button").click(() => {
        let title = $("#form-title").text();
        if (title !== 'Register') {
            $("#form-title").text("Register");
            $("#register-button").text("Have an Account? Login Here");
            $("#login-submit").text("Register");
            $(".alert-danger").hide();
            $(".alert-success").hide();
        }
        else {
            $("#form-title").text("Login To Todo App");
            $("#register-button").text("Don't Have an Account? Login Here");
            $("#login-submit").text("Submit");
            $(".alert-danger").hide();
            $(".alert-success").hide();
        }
    })

    //login / register
    $("#login-form").submit((e) => {
        e.preventDefault();
        const email = $("#input-email").val();
        const password = $("#input-password").val();
        const title = $("#form-title").text();

        if (title !== 'Register') {
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/users/login",
                data: { email, password }
            })
                .done(function (data) {
                    localStorage.setItem('access_token', data.access_token);
                    $("#login-form").hide();
                    $(".alert-danger").hide();
                    showData(localStorage.getItem('access_token'));
                })
                .fail(err => {
                    $(".alert-danger").text(err.responseJSON.message);
                    $(".alert-danger").show();
                })
        }
        else {
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/users/register",
                data: { email, password }
            })
                .done(function (data) {
                    $("#form-title").text("Login To Todo App");
                    $("#register-button").text("Don't Have an Account? Login Here");
                    $("#login-submit").text("Submit");
                    $(".alert-success").text("Register Success! Please login");
                    $(".alert-success").show();
                    $(".alert-danger").hide();
                })
                .fail(err => {
                    $(".alert-danger").text(err.responseJSON.message);
                    $(".alert-danger").show();
                })
        }
    })
})