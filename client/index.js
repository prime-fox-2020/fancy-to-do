let FncyTD = "http://localhost:3000"
let todos = []
$(document).ready(() => {

    //Cek kondisi awal login atau tidak dengan melihat akses token
    //#region CHECK LOGIN CONDITION
    if (!localStorage.akses_token) {
        // logout conditon
        $(".isLogout").show()
        $("section").hide()
        $(".isLogin").hide()
    } else {
        //login condition
        $("section").hide()
        $(".isLogout").hide()
        $(".isLogin").show()
        getTodos()
    }
    //#endregion

    //USER =============>
    //#region lOGIN
    $("#btnLoginForm").click((e) => {
        e.preventDefault()
        $(".isLogout").hide()
        $(".isLogin").hide()
        $("section.registerForm").hide()
        $("section.addTodoForm").hide()
        $("section.loginForm").show()
    })

    $("#btnLoginClose").click((e) => {
        e.preventDefault()
        $(".isLogout").show()
        $(".isLogin").hide()
        $("section").hide()
    })

    $("#btnLogin").click((e) => {
        e.preventDefault()
        let userLogin = {
            email: $("#inputEmailLogin").val(),
            password: $("#inputPasswordLogin").val()
        }
        console.log('userLogin: ', userLogin);
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/users/login",
            data: userLogin
        })
            .done((data) => {
                localStorage.setItem("akses_token", data.akses_token)
                $("section").hide()
                $(".isLogout").hide()
                $(".isLogin").show()
                $("#inputEmailLogin").val(""),
                    $("#inputPasswordLogin").val("")
                getTodos()
            })
            .fail(() => {
                $("#alertLogin").append(
                    `
                <div class="alert alert-danger" role="alert">
                <strong>Sorry youe email/password wrong</strong>
				</div>
                `
                )
            })
    })
    //#endregion 

    //#region REGISTER
    $("#btnRegisterForm").click((e) => {
        e.preventDefault()
        $(".isLogin").hide()
        $(".isLogout").hide()
        $("section").hide()
        $("section.registerForm").show()
    })

    $("#btnCancelRegister").click((e) => {
        e.preventDefault()
        $(".isLogin").hide()
        $(".isLogout").show()
        $("section").hide()

    })

    $("#btnRegister").click((e) => {
        e.preventDefault()
        let userRegister = {
            username: $("#inputNameReg").val(),
            email: $("#inputEmailReg").val(),
            password: $("#inputPasswordReg").val()
        }
        console.log('userRegister: ', userRegister);
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/users/register",
            data: userRegister
        })
            .done((data) => {
                $(".isLogin").hide()
                $(".isLogout").show()
                $("section").hide()
            })
            .fail(() => {
                $("#alertRegister").append(
                    `
                <div class="alert alert-danger" role="alert">
                <strong>Check your email/password wrong</strong>
				</div>
                `
                )
            })
    })
    //#endregion 

    //#region LOGOUT
    $("#btnLogout").click(function (e) { 
        e.preventDefault();
        signOut()
    });
    //#endregion

    //TODOS ===========>
    //#region ADD TODO BUTTON
    $("#btnAddTodoForm").click((e) => {
        e.preventDefault()
        $(".isLogin").hide()
        $(".isLogout").hide()
        $("section").hide()
        $("section.addTodoForm").show()
    })
    //#endregion

    //#region FORM ADD TODO BUTTOn
    $("#btnAddTodo").click(function (e) {
        e.preventDefault();
        let titleTodo = $("#inputTitle").val()
        let addTodo = {
            title: $("#inputTitle").val(),
            description: $("#inputDescription").val(),
            status: $("#status input[name='inputStatus']:checked").val(),
            due_date: $("#inputDueDate").val()
        }
        console.log('addTodo: ', addTodo);
        $.ajax({
            type: "post",
            url: FncyTD + "/todos",
            data: addTodo,
            headers: {
                akses_token: localStorage.akses_token
            },
        })
            .done((data) => {
                console.log('data: ', data);
                getTodos()
                $("#alertTodo").append(
                    `
                <div class="alert alert-info" role="alert">
                Todo ${titleTodo} successfully add to list
				</div>
                `
                );
            })
            .fail(() => {
                $(".isLogin").show();
                $(".isLogout").hide();
                $("section").hide();
                $("#alertTodo").append(
                    `
                <div class="alert alert-danger" role="alert">
                Todo ${titleTodo} unsuccessfully add to list
				</div>
                `
                );
            })
    });


    $("#btnCancelAddTodo").click((e) => {
        e.preventDefault()
        $(".isLogout").hide()
        $(".isLogin").show()
        $("section").hide()
    })
    //#endregion
})

function getTodos() {
    $.ajax({
        method: "GET",
        url: FncyTD + "/todos",
        headers: {
            akses_token: localStorage.getItem("akses_token")
        }
    })
        .done((data) => {
            todos = data
            console.log('todos: ', todos);
            appendTodos(todos)
        })
        .fail((err) => {
            console.log(err);
        })
}

function appendTodos(todos) {
    $("#tableBody").empty();
    todos.forEach(el => {
        $(".isLogin").show();
        $(".isLogout").hide();
        $("section").hide();
        $("#tableBody").append(
            ` <tr data-id="${el.id}">
                    <td>${el.title}</td>
                    <td>${el.description}</td>
                    <td>${el.status}</td>
                    <td>${el.due_date}</td>
                    <td>
                    <button type="button" class="btn btn-primary editBtn" onclick=editStatus(${el.id})>Change Status</button>
                    <button type="button" class="btn btn-danger deleteBtn" onclick=deleteTodo(${el.id})>Delete</button>
                    </td>
                    </tr>`
        )
    });
}

function deleteTodo(id) {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3000/todos/" + id,
        params: id,
        headers: {
            akses_token: localStorage.getItem("akses_token")
        }
    })
        .done((data) => {
            $(".list").hide();
            getTodos()
        })
        .fail((err) => {
            console.log(err);
        })
}

function editStatus(id) {
    $.ajax({
        type: "get",
        url: FncyTD + "/todos/" + id,
        headers: {
            akses_token: localStorage.akses_token
        }
    })
        .done((data) => {
            let todo = data
            console.log('todo: ', todo.status);
            if (todo.status === 'progress') {
                todo.status = 'done'
            } else {
                todo.status = 'progress'
            }
            console.log('todo update: ', todo.status);
            return $.ajax({
                type: "put",
                url: FncyTD + "/todos/" + id,
                data: data,
                headers: {
                    akses_token: localStorage.akses_token
                }
            });
        })
        .done((data) => {
            $("#tableBody").children().remove()
            getTodos()
        })
        .fail(() => {
            console.log(err);
        })
}


//#region Google Sign

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log('profile: ', profile);

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: "http://localhost:3000/users/login/google",
        data: { id_token }
    })
        .done((data) => {
            $(".isLogout").hide();
            $(".isLogin").show();
            localStorage.setItem("akses_token", data.akses_token)
            getTodos()
        })
        .fail((err) => {
            console.log(err);
        })
}

function signOut() {
    //google logout
    if (!gapi) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
            .then(() => {
                console.log('User signed out.');
            });
    } else {
        localStorage.clear()
    }

    //user app
    $(".isLogout").show()
    $(".isLogin").hide()
    $("section").hide()
}

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}

function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 200,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

//#endregion