const url = 'http://localhost:3003'
const login = false

$(document).ready(function () {

    $("#todos-page").hide()
    $("#register").hide()
    $("#register-success").hide()
    $("#login-fail").hide()
    $("#logout-btn").hide()

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
            crossDomain: true,
            data: { email, password }
        }).done(response => {
            localStorage.removeItem("access_token")
            localStorage.setItem("access_token", response.access_token)
            $("#login-page").hide()
            $("#todos-page").show()
            $("#logout-btn").show()
            viewTodos()
        }).fail(err => {
            console.log(err)
        })
    })

    $("#add-btn").click(i => {
        const title = $("#title").val()
        const description = $("#description").val()
        const due_date = $("#due_date").val()
        const status = "Not done yet"
        $.ajax({
            headers: { "access_token": `${localStorage.getItem("access_token")}` },
            type: 'POST',
            url: `${url}/todos`,
            data: { title, description, due_date, status }
        }).done(response => {
            $("#todos").append(`
                    <tr id="row-${response.id}" class="todo-tr">
                        <td>${response.title}</td>
                        <td>${response.description}</td>
                        <td>${response.due_date}</td>
                        <td>${response.status}</td>
                        <td>
                            <button data-id="${response.id}" class="btn-edit btn-info">Edit</button>
                            <button data-id="${response.id}" class="btn-del btn-info">Delete</button>
                        </td>
                    </tr>
            `)
        }).fail(err => {
            console.log(err)
        })
    })

    $(document).on("click", ".btn-del", function(i) {
        const id = $(this).attr("data-id")
        $(`#row-${id}`).remove()
        $.ajax({
            type: "DELETE",
            url: `${url}/todos/${id}`,
            headers: { "access_token": `${localStorage.getItem("access_token")}` }
        }).done(response => {
            console.log(`sukses delete!`)
        }).fail(err => {
            console.log(err)
        })
    })

    $(document).on("click", ".btn-edit", function(i) {
        const id = $(this).attr("data-id")
        $.ajax({
            type: "GET",
            url: `${url}/todos/${id}`,
            headers: { "access_token": `${localStorage.getItem("access_token")}` }
        }).done(response => {
            console.log(id)
            console.log(response)
            $("#edit").append(`
            <div id="sub-edit">
            <h5>Edit it!</h5>
            <input type="text" name="title-edit" id="title-edit" value="${response[0].title}">
            <input type="text" name="description-edit" id="description-edit" value="${response[0].description}">
            <input type="text" name="due_date-edit" id="due_date-edit" value="${response[0].due_date}"><br>
            <input type="text" name="status-edit" id="status-edit" value="${response[0].status}"><br>
            <button id="edit-btn" type="submit">Edit!</button><br>
            </div>
            `)
            $(document).on("click", "#edit-btn", function(j) {
                $.ajax({
                    type: "PUT",
                    url: `${url}/todos/${id}`,
                    headers: { "access_token": `${localStorage.getItem("access_token")}` },
                    data: {
                        "title": $("#title-edit").val(),
                        "description": $("#description-edit").val(),
                        "status": $("#status-edit").val(),
                        "due_date": $("#due_date-edit").val()
                    }
                }).done(response2 => {
                    console.log(`sukses edit!`)
                    $("#sub-edit").remove()
                    $(".todo-tr").remove()
                    viewTodos()
                }).fail(err => {
                    console.log(err)
                })
            })
        }).fail(err => {
            console.log(err)
        })
    })

    $("#logout-btn").click(i => {
        i.preventDefault()
        localStorage.removeItem("access_token")
        $("#login-page").show()
        $("#todos-page").hide()
        $("#logout-btn").hide()
        $(".todo-tr").remove()
    })

    function viewTodos() {
        $.ajax({
            headers: { "access_token": `${localStorage.getItem("access_token")}` },
            type: 'GET',
            url: `${url}/todos`,
        }).done(response => {
            response.forEach(i => {
                $("#todos").append(`
                    <tr id="row-${i.id}" class="todo-tr">
                        <td>${i.title}</td>
                        <td>${i.description}</td>
                        <td>${i.due_date}</td>
                        <td>${i.status}</td>
                        <td>
                        <button data-id="${i.id}" class="btn-edit btn-info">Edit</button>
                        <button data-id="${i.id}" class="btn-del btn-info">Delete</button>
                        </td>
                    </tr>
                    `)
            })
        }).fail(err => {
            console.log(err)
        })
    }

})
