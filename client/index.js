let statusLogin = false;
$(document).ready(function () {
    $(".todo").hide();
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
                if (!statusLogin) {
                    $("#page1").show();
                    $(".todo").hide();
                } else {
                    alert('Succes login');
                    $("#page1").hide();
                    $(".todo").show();
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
    $("#register").click(function (e) {
        e.preventDefault()
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
                alert('success register, Go login fisrt')
                // statusLogin = true;
                // if (!statusLogin) {
                //     $("#page1").show();
                //     $(".todo").hide();
                // } else {
                //     $("#page1").hide();
                //     $(".todo").show();
                // }
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
        } else {
            $("#page1").hide();
            $(".todo").show();
        }
    })

    function getTodos() {
        console.log(localStorage.getItem("access_token"))
        $.ajax({
            url: "http://localhost:3000/todo",
            type: "GET",
            headers: { "access_token": localStorage.getItem("access_token") }
        })
            .done(data => {
                console.log("todo")
                console.log(data)
                // <tr>
                //     <th scope="row">1</th>
                //     <td>Mark</td>
                //     <td>Otto</td>
                //     <td>@mdo</td>
                // </tr>
    
            })
            .fail(error => {
                console.log(error)
            })
            .always(response => {
                console.log("complete")
            })
    }
})

