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
                localStorage.setItem("username", data.username)
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
                <div class="alert alert-danger d-flex" role="alert">
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
                <div class="alert alert-danger d-flex" role="alert">
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

    //#region NavBar Button

    //Button Home
    $("#homeBtn").click((e) => {
        e.preventDefault();
        $(".isLogin").hide();
        $(".isLogout").show();
        $(".isLogout .jumbotron").show();
        $("section").hide();
    })
    //Button Holidays
    $("#holidaysListBtn").click((e) => {
        e.preventDefault();
        $(".isLogin").hide();
        $(".isLogout").show();
        $(".isLogout .jumbotron").hide();
        $("section").hide();
        $("section#listHolidays").show();
    });

    $("button#searcHolidaysBtn").click((e) => {
        e.preventDefault();
        console.log('clik button search');
        let country = $("#country option:selected").val();
        let year = $("#year option:selected").val();
        $.ajax({
            type: "GET",
            url: FncyTD + "/holidays?country=" + country + "&year=" + year
        })
            .done((data) => {
                console.log('data: ', data.response.holidays);
                $("#tableBodyHolidays").show()
                if (localStorage.akses_token) {
                    console.log(localStorage.akses_token);
                    $(".isLogin #btnLogout").show()
                } else {
                    $(".isLogin #btnLoginForm").show()
                    $(".isLogin #btnRegisterForm").show()
                }
                data.response.holidays.forEach(el => {
                    $("#tableBodyHolidays").append(
                        `
                        <tr>
                        <td>${el.name}</td>
                        <td>${el.description}</td>
                        <td>${el.date.iso.slice(0, 10)}</td>
                        </tr>
                        `
                    );
                });
            })
    });


    //#endregion

    $('#selected_value').click(function () {
        var value = $("#select_option option:selected").val();
        alert(value)
    })

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
            $(".isLogin h4#usernameLogin").empty();
            $(".isLogin h4#usernameLogin").append(
                `
                Selamat datang ${ localStorage.getItem("username")}
                `
            );
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
            $("#alertTodo").append(
                `
                <div class="alert alert-info d-flex" role="alert">
                <strong>Data success deleted</strong>
                </div>
                `
            )
            getTodos()
        })
        .fail((err) => {
            $("#alertTodo").append(
                `
                <div class="alert alert-danger d-flex" role="alert">
                <strong>Data unsuccess deleted</strong>
                </div>
                `
            )
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
            $("#alertTodo").append(
                `
            <div class="alert alert-info d-flex" role="alert">
            <strong>Data success updated</strong>
            </div>
            `
            )
            getTodos()
        })
        .fail(() => {
            $("#alertTodo").append(
                `
            <div class="alert alert-danger d-flex" role="alert">
            <strong>Data success updated</strong>
            </div>
            `
            )
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
            $("section").hide();
            $(".isLogout").hide();
            $(".isLogin").show();
            localStorage.setItem("akses_token", data.akses_token)
            localStorage.setItem("username", data.username)
            getTodos()
        })
        .fail((err) => {
            console.log(err);
        })
}

function signOut() {
    //google logout
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
        .then(() => {
            console.log('User signed out.');
        });
    localStorage.clear()
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