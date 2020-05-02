const url = 'http://localhost:3003'
const login = false

$(document).ready(function () {

    if (login == false) {
        $("#logout-btn").hide()
    } else (
        $("#logout-btn").show()
    )

    $("#todos-page").hide()
    $("#register").hide()
    $("#register-success").hide()
    $("#login-fail").hide()

    $("#register-go").click(i => {
        i.preventDefault()
        $("#register").show()
        $("#login").hide()
        $("#register-success").hide()
    })

    $("#register-form-btn").click(i => {
        i.preventDefault()
        $("#register").hide()
        $("#register-success").show()
        const email = $("#register-form-email").val()
        const password = $("#register-form-pass").val()
        $.ajax({
            type: 'POST',
            url: `${url}/users/register`,
            data: { email, password }
        }).done(response => {
            console.log(`Registration succeeded!`)
        }).fail(err => {
            console.log(err)
        })
    })

    $("#register-back-btn").click(i => {
        i.preventDefault()
        $("#login").show()
        $("#register-success").hide()
    })

    $("#login-back-btn").click(i => {
        i.preventDefault()
        $("#login").show()
        $("#login-fail").hide()
    })

    $("#login-form-btn").click(i => {
        i.preventDefault()
        const email = $("#login-form-email").val()
        const password = $("#login-form-pass").val()
        $.ajax({
            type: 'POST',
            url: `${url}/users/login`,
            data: { email, password }
        }).done(response => {
            login = true
            localStorage.setItem("access_token", response.access_token)
            viewTodos()
            $("login-page").hide()
            $("todos-page").show()
        }).fail(err => {
            console.log(err)
        })
    })

    function viewTodos() {
        $.ajax({
            type: 'GET',
            url: `${url}/todos`,
            headers: { access_token: localStorage.getItem("access_token") }
        }).done(response => {
            $("#todos").append(`
            <tr>
                <td>${response.title}</td>
                <td>${response.description}</td>
                <td>${response.due_date}</td>
                <td>${response.status}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
            `)
        }).fail(err => {
            console.log(err)
        })
    }
})
