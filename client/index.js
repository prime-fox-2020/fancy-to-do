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
            $("#main-navbar").show();
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
    $("#main-navbar").hide();
    $("input-password").val("");
}

//read data todos
const showData = (token) => {
    $.ajax({
        method: "GET",
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
                <td>
                    <button type="button" onclick="editTodos(${data[i].id});" class="btn btn-primary">Edit</button>&nbsp;
                    <button type="button" onclick="deleteTodos(${data[i].id});" class="btn btn-danger">Delete</button>
                </td>
                </tr>`
            }
            table.html(todos);
        })
    $("#show-data").show();
}

//post / put todos
$("#input-data").submit((e) => {
    e.preventDefault();
    const titleForm = $("#form-input-title").text();
    const access_token = localStorage.getItem("access_token");
    const id = $("#id").val();
    const title = $("#title").val();
    const description = $("#description").val();
    const due_date = $("#due-date").val();

    //post data
    if (titleForm == 'Add New Todo') {
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/todos",
            headers: { access_token },
            data: { title, description, due_date }
        })
            .done(data => {
                $("#input-data").hide();
                $("#show-data").show();
                $(".alert-danger").hide();
                showData(localStorage.getItem('access_token'));
            })
            .fail(err => {
                $(".alert-danger").text(err.responseJSON.message);
                $(".alert-danger").show();
            })
    }
    else { //put data
        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/todos/${id}`,
            headers: { access_token },
            data: { title, description, due_date }
        })
            .done(data => {
                $("#input-data").hide();
                $("#show-data").show();
                $(".alert-danger").hide();
                showData(localStorage.getItem('access_token'));
            })
            .fail(err => {
                $(".alert-danger").text(err.responseJSON.message);
                $(".alert-danger").show();
            })
    }
})

//goto form add
const addTodos = () => {
    $("#form-input-title").text("Add New Todo");
    $("#input-submit").text("Submit");
    $("#title").val("");
    $("#description").val("");
    $("#due-date").val("");
    $("#show-data").hide();
    $("#input-data").show();
}

//goto form edit
const editTodos = (params) => {
    const access_token = localStorage.getItem('access_token');
    const url = `http://localhost:3000/todos/${params}`;
    $.ajax({
        method: "GET",
        url,
        headers: { access_token }
    })
        .done(data => {
            $("#form-input-title").text("Update Todo");
            $("#input-submit").text("Update");
            $("#id").val(data.id);
            $("#title").val(data.title);
            $("#description").val(data.description);
            $("#due-date").val(data.due_date);
            $("#show-data").hide();
            $("#input-data").show();
        })
}

//delete data
const deleteTodos = (params) => {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        const access_token = localStorage.getItem('access_token');
        const url = `http://localhost:3000/todos/${params}`;
        $.ajax({
            type: "DELETE",
            url,
            headers: { access_token }
        })
            .done(data => {
                showData(access_token);
            })
    }
    else return false;
}

//cancel input
$("#cancel").click(() => {
    $("#input-data").hide();
    $("#show-data").show();
})

//jquery
$(document).ready(() => {
    //front page
    $("#show-data").hide();
    $("#register-button").css("color", "blue");
    $(".alert-danger").hide();
    $(".alert-success").hide();
    $("#main-navbar").hide();
    $("#input-data").hide();
    // signOut();

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
                    $("#main-navbar").show();
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