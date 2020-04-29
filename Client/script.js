check()
function check() {
    const loggedIn = localStorage.getItem('access_token')
    console.log(loggedIn);
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
                todo += `<li class="todo">${ele.title} <button class="buttonDelete" data-target="#delete${ele.id}" style="float:right" data-toggle="modal">delete</button> <button class="buttonEdit" data-target="#edit${ele.id}" style="float:right" data-toggle="modal">edit</button> 
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
            console.log(failed)
        })
        .always(() => {
            console.log("always");
        })


    if (!loggedIn) {
        $("#toDoList").hide()
        $("#loginForm").show()
        $("#logout").hide()
        $("#registerForm").hide()
    } else {
        $("#toDoList").show()
        $("#loginForm").hide()
        $("#logout").show()
        $("#registerForm").hide()
    }
}

$('#goToLogin').on('click', function(e){
    e.preventDefault()
    $('#registerForm').hide()
    $('#loginForm').show()
})

$('#goToRegister').on('click', function(e){
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
            console.log(response);
            $('#inputEmailRegis').val("")
            $('#inputPasswordRegis').val("")
            check()
        })
        .fail(failed => {
            $('#inputEmailRegis').val("")
            $('#inputPasswordRegis').val("")
            console.log(failed);
        })
        .always(() => {
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
            $('#inputEmail').val("")
            $('#inputPassword').val("")
            check()
        })
        .fail(failed => {
            $('#inputEmail').val("")
            $('#inputPassword').val("")
            console.log(failed);
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
            console.log(failed);
        })
        .always(() => {
            console.log("----------");
        })
    $("#toDoTitle").val("");
    $("#toDoDescription").val("");
})

$('ul').on('click', '.buttonEdit', function (e) {
    // const li = $(this).parent();
    const loggedIn = localStorage.getItem('access_token')
    const data_target = $(this).attr("data-target").slice(1);
    const id = data_target.slice(4)
    $(".listTodo").hide()
    $("#submitNew").hide()
    $("#update").show()
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: loggedIn
        }
    })
        .done(response => {
            console.log(response);
            $("#toDoTitle").val(response.title)
            $("#toDoDescription").val(response.description)
            $("#toDoStatus").val(response.status)

            $("#update").on('click', function () {
                const inputTodoTitle = $("#toDoTitle").val();
                const inputTodoDescription = $("#toDoDescription").val();
                const inputTodoStatus = $("#toDoStatus").val();
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
                        console.log(response);
                    })
                    .fail(failed => {
                        console.log(failed);
                    })
                    .always(() => {
                        console.log("********");
                    })
            })
        })
        .fail(failed => {
            console.log(failed);
        })
        .always(() => {
            console.log(" ");
        })
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
                    console.log("delete failed");
                })
                .always(() => {
                    console.log("");
                })
        })
    })
})