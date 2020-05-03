let statusLogin = false;
$(document).ready(function () {
    $(".todo").hide();
    $(".addTodo").hide();
    $(".editTodo").hide();
    $("#login").click(function () {
        console.log("clicked")
        let objectData = {
            email: $("#emailLogin").val(),
            password: $("#passwordLogin").val()
        }
        console.log(objectData);
        $.ajax({
            url: "http://localhost:3000/login",
            type: "POST",
            dataType: "json",
            data: objectData
        })
            .done(data => {
                console.log('response >>>', data);
                localStorage.setItem("access_token", data.access_token);
                statusLogin = true;
                if (statusLogin) {
                    alert('Succes login');
                    $("#page1").hide();
                    $(".todo").show();
                    $(".addTodo").hide();
                    getTodos();
                }
            })
            .fail(error => {
                console.log(error);
            })
            .always(response => {
                console.log("complete");
            })

    })

    $("#register").click(function () {
        console.log("clicked")
        let objectData = {
            name: $("#name").val(),
            email: $("#email").val(),
            password: $("#password").val()
        }
        console.log(objectData);
        $.ajax({
            url: "http://localhost:3000/register",
            type: "POST",
            dataType: "json",
            data: objectData
        })
            .done(data => {
                return alert('success register, Go login fisrt')
            })
            .fail(error => {
                console.log(error);
            })
            .always(response => {
                console.log("complete")
            })
    })

    $("#logout").click(function () {
        console.log("clicked")
        statusLogin = false;
        if (!statusLogin) {
            $("#page1").show();
            $(".todo").hide();
            $(".addTodo").hide();
        } else {
            $("#page1").hide();
            $(".todo").show();
        }
    })

    $("#add").click(function () {
        $(".todo").hide();
        $(".addTodo").show();
    })

    $("#cancelAdd").click(function () {
        $(".todo").show();
        $(".addTodo").hide();
    })

    $("#cancelEdit").click(function () {
        $(".todo").show();
        $(".addTodo").hide();
    })

    $("#submitAdd").click(function () {
        let objectData = {
            title: $("#title").val(),
            description: $("#description").val(),
            due_date: $("#due_date").val()
        }
        $.ajax({
            url: `http://localhost:3000/todo/${localStorage.getItem("User_ID")}`,
            type: "POST",
            headers: { "access_token": localStorage.getItem("access_token") },
            data: objectData
        })
            .done(data => {
                $(".todo").show();
                $(".addTodo").hide();
                getTodos()
                return alert('success add data')
            })
            .fail(error => {
                console.log(error);
            })
            .always(response => {
                console.log("complete")
            })
    })

    $("#submitEdit").click(function () {
        let objectData = {
            title: $("#titleedit").val(),
            description: $("#descriptionedit").val(),
            due_date: $("#due_dateedit").val()
        }
        $.ajax({
            url: `http://localhost:3000/todo/${localStorage.getItem("Data_ID")}`,
            type: "PUT",
            headers: { "access_token": localStorage.getItem("access_token") },
            data: objectData
        })
            .done(data => {
                $(".todo").show();
                $(".editTodo").hide();
                getTodos()
                return alert('success edit data')
            })
            .fail(error => {
                console.log(error);
            })
            .always(response => {
                console.log("complete")
            })
    })
})

function getTodos() {
    console.log(localStorage.getItem("access_token"))
    $.ajax({
        url: "http://localhost:3000/todo",
        type: "GET",
        headers: { "access_token": localStorage.getItem("access_token") }
    })
        .done(data => {
            console.log(data)
            localStorage.setItem("User_ID", data[0].UserId);
            let dataTodo = ``;
            for (let a in data) {
                dataTodo += `
                <tr>
                     <th scope="row">${data[a].id}</th>
                     <td>${data[a].title}</td>
                     <td>${data[a].description}</td>
                     <td>${data[a].due_date}</td>
                     <td>
                     <button type="button" onclick="editTodo(${data[a].id});" class="btn btn-primary">Edit</button>
                     <button type="button" onclick="deleteTodo(${data[a].id});" class="btn btn-danger">Delete</button>
                     </td>
                </tr>
                `
            }
            $("#dataTabel").html(dataTodo);
        })
        .fail(error => {
            console.log(error)
        })
        .always(response => {
            console.log("complete")
        })
}

function deleteTodo(id) {
    let check = confirm("Are you sure?");
    if (check) {
        $.ajax({
            url: `http://localhost:3000/todo/${id}`,
            type: "DELETE",
            headers: { "access_token": localStorage.getItem("access_token") }
        })
            .done(data => {
                getTodos();
                return alert("Todos Deleted");
            })
    }
}

function editTodo(id) {
    $.ajax({
        url: `http://localhost:3000/todo/${id}`,
        type: "GET",
        headers: { "access_token": localStorage.getItem("access_token") }
    })
        .done(data => {
            localStorage.setItem("Data_ID", data.id);
            console.log(data);
            $("#titleedit").val(data.title);
            $("#descriptionedit").val(data.description);
            $("#due_dateedit").val(data.due_date);
            $(".todo").hide();
            $(".editTodo").show();
        })

}
