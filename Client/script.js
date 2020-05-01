let main = {}

$(document).ready(function wow() {
    let check = function () {
        const loggedIn = localStorage.getItem('access_token')
        // console.log(loggedIn);
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/todos',
            headers: {
                access_token: loggedIn
            }
        })
            .done(response => {
                const elTodos = $("#todos");
                let todo = ''
                response.forEach(ele => {
                    todo += `<li class="todo">${ele.title} <input class="buttonDelete btn" data-target="#delete${ele.id}" style="float:right; color:white;" data-toggle="modal" type="button" value="delete"></input><input class="buttonEdit btn" a="${ele.title}" b="${ele.description}" c="${ele.status}" data-target="#edit${ele.id}" style="float:right; color:white;" data-toggle="modal" type="button" value="edit"></input>
                    <input class="buttonSpeech btn" id="${ele.id}" style="float:right; color:blue; font-weight:700;" type="button" value="Listen"> 
            <ul>
                <li>
                    Description: ${ele.description}
                </li>
                <li>
                    Status: ${ele.status}
                </li>
            </ul>
        </li>`
                });
                elTodos.html(todo)
            })
            .fail(failed => {
                console.log(failed.responseJSON)
            })
            .always( ()=>{
                $("#errTitle").html(`<p id="errTitle"></p>`)
                $("#errDesc").html(`<p id="errDesc"></p>`)
            })


        if (!loggedIn) {
            $("#toDoList").hide()
            $("#todos").hide()
            $("#loginForm").show()
            $("#logout").hide()
            $("#registerForm").hide()
            $("#updateForm").hide()
        } else {
            $("#toDoList").show()
            $("#todos").show()
            $("#loginForm").hide()
            $("#logout").show()
            $("#registerForm").hide()
            $("#updateForm").hide()
        }
    }

    check()

    $('#goToLogin').on('click', function (e) {
        e.preventDefault()
        $('#registerForm').hide()
        $('#loginForm').show()
    })

    $('#goToRegister').on('click', function (e) {
        e.preventDefault()
        $('#registerForm').show()
        $('#loginForm').hide()
    })


    $("#registerForm").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/user/register',
            data: {
                email: $('#inputEmailRegis').val(),
                password: $('#inputPasswordRegis').val()
            }
        })
            .done(response => {
                // console.log(response);
                $('#inputEmailRegis').val("")
                $('#inputPasswordRegis').val("")
                check()
            })
            .fail(failed => {
                // console.log(failed.responseJSON.message);
                if (failed.responseJSON.message.length == 2) {
                    $("#errEmailRegis").html(`<p id="errEmailRegis">${failed.responseJSON.message[0]}</p>`)
                    $("#errPassRegis").html(`<p id="errPassRegis">${failed.responseJSON.message[1]}</p>`)
                } else if (failed.responseJSON.message == "kolom email tidak boleh kosong") {
                    $("#errEmailRegis").html(`<p id="errEmailRegis">${failed.responseJSON.message}</p>`)
                    $("#errPassRegis").html(`<p id="errPassRegis"></p>`)
                } else if (failed.responseJSON.message == "kolom password tidak boleh kosong") {
                    $("#errPassRegis").html(`<p id="errPassRegis">${failed.responseJSON.message}</p>`)
                    $("#errEmailRegis").html(`<p id="errEmailRegis"></p>`)
                } else {
                    $("#errEmailRegis").html(`<p id="errEmailRegis"></p>`)
                    $("#errPassRegis").html(`<p id="errPassRegis"></p>`)
                }
                $('#inputEmailRegis').val("")
                $('#inputPasswordRegis').val("")
            })
            .always(() => {
                console.log("always register");
            })
    })

    $("#loginForm").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/user/login',
            data: {
                email: $('#inputEmail').val(),
                password: $('#inputPassword').val()
            }
        })
            .done(response => {
                // console.log(response);
                access_token = response.access_token
                localStorage.setItem('access_token', response.access_token)
                $("#errEmailPassLogin").html(`<p id="errEmailPassLogin"></p>`)
                $('#inputEmail').val("")
                $('#inputPassword').val("")
                check()
            })
            .fail(failed => {
                console.log(failed.responseJSON);
                if (failed.responseJSON.message) {
                    $("#errEmailPassLogin").html(`<p id="errEmailPassLogin">${failed.responseJSON.message}</p>`)
                } else {
                    $("#errEmailPassLogin").html(`<p id="errEmailPassLogin"></p>`)
                }
                $('#inputEmail').val("")
                $('#inputPassword').val("")
            })
            .always(() => {
            })
    })

    $("#logout").on("click", function () {
        localStorage.removeItem("access_token")
        $("#logout").hide()
        check()
    })



    $("#submitNew").on("click", (e) => {
        const loggedIn = localStorage.getItem('access_token')
        e.preventDefault();
        const inputTodoTitle = $("#toDoTitle").val();
        const inputTodoDescription = $("#toDoDescription").val();
        const inputTodoStatus = $("#toDoStatus").val();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/todos',
            data: {
                title: inputTodoTitle,
                description: inputTodoDescription,
                status: inputTodoStatus
            },
            headers: {
                access_token: loggedIn
            }
        })
            .done(response => {
                console.log(response);
                check()
            })
            .fail(failed => {
                if (failed.responseJSON.message.length == 2) {
                    $("#errTitle").html(`<p id="errTitle">${failed.responseJSON.message[0]}</p>`)
                    $("#errDesc").html(`<p id="errDesc">${failed.responseJSON.message[1]}</p>`)
                    console.log(failed.responseJSON.message);
                } else if (failed.responseJSON.message == "kolom title tidak boleh kosong") {
                    $("#errTitle").html(`<p id="errTitle">${failed.responseJSON.message}</p>`)
                    $("#errDesc").html(`<p id="errDesc"></p>`)
                } else if (failed.responseJSON.message == "kolom description tidak boleh kosong") {
                    $("#errDesc").html(`<p id="errDesc">${failed.responseJSON.message}</p>`)
                    $("#errTitle").html(`<p id="errTitle"></p>`)
                } else {
                    $("#errTitle").html(`<p id="errTitle"></p>`)
                    $("#errDesc").html(`<p id="errDesc"></p>`)
                }
            })
            .always(() => {
                // console.log("----------");
            })
            $("#toDoTitle").val("");
            $("#toDoDescription").val("");
            $("#toDoStatus").val("backlog");
    })

    function getData(id) {

    }

    $(document).on('click', '.buttonEdit', function (e) {
        e.preventDefault()
        const loggedIn = localStorage.getItem('access_token')
        const data_target = $(this).attr("data-target").slice(1);
        let id = data_target.slice(4)
        $(".listTodo").hide()
        $("#toDoList").hide()
        $("#submitNew").hide()
        $("#updateForm").show()
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                access_token: loggedIn
            }
        })
            .done(response => {
                $("#updateToDoTitle").val(response.title)
                $("#updateToDoDescription").val(response.description)
                $("#updateToDoStatus").val(response.status)
                $("#update").on("click", function (e) {
                    e.preventDefault()
                    let inputTodoTitle = $("#updateToDoTitle").val();
                    let inputTodoDescription = $("#updateToDoDescription").val();
                    let inputTodoStatus = $("#updateToDoStatus").val();

                    $.ajax({
                        type: 'PUT',
                        url: `http://localhost:3000/todos/${id}`,
                        data: {
                            title: inputTodoTitle,
                            description: inputTodoDescription,
                            status: inputTodoStatus
                        },
                        headers: {
                            access_token: loggedIn
                        }
                    })
                        .done(response => {
                            check()
                        })
                        .fail(failed => {
                            console.log(failed.responseJSON.message);
                        })
                        .always(() => {
                            $("#submitNew").show()
                            $("#updateForm").hide()
                            id = null
                            $("#updateToDoTitle").val(" ");
                            $("#updateToDoDescription").val(" ");
                        })
                })
            })
            .fail(failed => {
                console.log(failed.responseJSON.message);
            })
    })


    $('ul').on('click', '.buttonSpeech', function (e) {
        const loggedIn = localStorage.getItem('access_token')
        const id = $(this).attr("id")
        // console.log(id);
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/todos/${id}`,
            headers: {
                access_token: loggedIn
            }
        })
            .done(response => {
                // console.log(response);
                $.ajax({
                    type: 'GET',
                    url: `http://localhost:3000/speech/${response.title},description ${response.description}, status ${response.status}`
                })
                    .done(response => {
                        // console.log(response);
                        new Audio(response.url).play()
                    })
                    .fail(failed => {
                        console.log(failed.responseJSON.message);
                    })
            })
            .fail(failed => {
                console.log(failed.responseJSON.message);
            })

        // console.log(new Audio("http://api.voicerss.org/?key=022e3bb468244fd1a42cf81ace150146&hl=en-us&src=Hello, world!"));

    })




    $('ul').on('click', '.buttonDelete', function (e) {
        const li = $(this).parent();
        const loggedIn = localStorage.getItem('access_token')
        const data_target = $(this).attr("data-target").slice(1);
        const id = data_target.slice(6)
        $(".ede").attr("id", data_target)
        $(".yes").click(function () {
            li.fadeOut("slow", function () {
                $.ajax({
                    type: 'DELETE',
                    url: `http://localhost:3000/todos/${id}`,
                    headers: {
                        access_token: loggedIn
                    }
                })
                    .done(response => {
                        console.log("delete success");
                    })
                    .fail(failed => {
                        console.log(failed.responseJSON);
                    })
            })
        })
    })
    main.func = check
})

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/user/googleLogin",
        data: {
            id_token: id_token
        }
    })
        .done(response => {
            // console.log(response);
            localStorage.setItem('access_token', response.access_token)
            main.func()
        })
        .fail(failed => {
            console.log(failed.responseJSON);
        })
}
