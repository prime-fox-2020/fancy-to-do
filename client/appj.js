$(document).ready(() => {

    // $("#navbar").show()

    if (!localStorage.akses_token) {
        //Belum login hide semua id login
        $(".login").hide()
    } else {
        $(".login").show()
        $(".logout").hide()
        $(".jumbotron").hide()
        getTodos()
    }

    //button login
    $("#btnLogin").submit((e) => {
        let user = {
            email: $("#inputEmailLogin").val(),
            password: $("#inputPasswordLogin").val()
        }
        e.preventDefault()
        console.log('user: ', user);
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/users/login",
            data: user
        })
            // .done((data) => {
            //     $(".login").show()
            //     $(".jumbotron").hide()
            //     $(".modal").hide()
            //     localStorage.setItem("akses_token", data.akses_token)
            //     getTodos()
            // })
            // .fail((err) => {
            //     $("#login").hide()
            //     console.log(err)
            // })
    })

    //Register account
    $("#btnRegister").click((e) => {
        let newUser = {
            username: $("#inputNameReg").val(),
            email: $("#inputEmailReg").val(),
            password: $("#inputPasswordReg").val()
        }
        console.log('newUser: ', newUser);
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/users/register",
            data: newUser
        })
            .done(function () {
                $(".login").show()
                $(".logout").hide()
                $(".modal").hide()
                $(".jumbotron").hide()
            })
            .fail((err) => {
                console.log(err)
            })
    })

    // list todo
    $("#listTodos").click((e) => {
        e.preventDefault()
        getTodos()
    })

    //delete todo
    $(document).on("click", "#delete", (e) => {
        e.preventDefault()
        const id = $(this).attr("data-id")
        console.log('id: ', id);
        $.ajax({
            method: "DELETE",
            url: "http://localhost:3000/todos",
            params: {
                id: id
            },
            headers: {
                akses_token: localStorage.getItem("akses_token")
            }
        })
            .done((data) => {
                $(".login").show()
                getTodos()
                console.log(data);
            })
            .fail((err) => {
                console.log(err);
            })
    })

    //add todo
    $("#btn-addTodo").click((e) => {
        let newTodo = {
            title: $("#inputTitle").val(),
            description: $("#inputDescription").val(),
            status: $("#inputStatus").val(),
            due_date: $("#inputDueDate").val()
        }
        console.log('newTodo: ', newTodo);
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/todos",
            data: newTodo,
            headers: {
                akses_token: localStorage.getItem("akses_token")
            }
        })
            .done((data) => {
                getTodos()
                console.log(data);
            })
            .fail((err) => {
                console.log(err);
            })
    })

    //logout action btn
    $("#btnLogout").click((e) => {
        e.preventDefault
        localStorage.removeItem('akses_token')
    })
        .done((data) => {
            // $("#navbar").show()
            $(".login").hide()
            $(".logout").show()
            $(".jumbotron").show()
            console.log('success logout');
        })
        .fail((err) => {
            console.log(err);
        })

})

function getTodos() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            akses_token: localStorage.getItem("akses_token")
        }
    })
        .done((data) => {
            console.log('data: ', data);
            data.forEach(el => {
                console.log('el: ', el);
                $("#tableBody").append(
                    ` <tr>
                            <td>${el.title}</td>
                            <td>${el.description}</td>
                            <td>${el.status}</td>
                            <td>${el.due_date}</td>
                            <td>
                            <button type="button" id="edit" class="btn btn-primary" data-id=${el.id}>Edit</button>
                            <button type="button" id="delete" class="btn btn-primary" data-id=${el.id}>Delete</button>
                            </td>
                            </tr>`
                )
            });
        })
        .fail((err) => {
            console.log(err);
        })
}

