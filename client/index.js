$(document).ready(function(){


    $("#form-login").hide()
    $("#form-register").hide()
    $("#dashboardPage").hide()
    $("#navbarUser").show()
    $("#navbarTodo").hide()
    $("#addTodo").hide()
    $("#editTodo").hide()
    $("#image").hide()

    if(localStorage.token){
        $("#navbarUser").hide()
        $("#navbarTodo").show()
        // $("#dashboardPage").show()
        fetchTodo()
    }else{
        $("#navbarUser").show()
        $("#navbarTodo").hide()
        $("#dashboardPage").hide()
    }
    

    $('#registerid').on('click',function(e){
        $("#form-register").show()
        $("#form-login").hide()
        e.preventDefault()
    })


    $('#loginid').on('click',function(e){
        $("#form-login").show()
        $("#form-register").hide()
        $('#signError').hide()
        e.preventDefault()
    })

    $("#form-register").on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:"http://localhost:3000/user/register",
            type:"POST",
            data:{
                email:$('#input-email').val(),
                password:$('#input-password').val()
            }
        })
        $('#input-email').val("")
        $('#input-password').val("")
        $("#form-login").show()
        $("#form-register").hide()
    })

    $("#form-login").on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:"http://localhost:3000/user/login",
            type:"POST",
            data:{
                email:$('#input-email-login').val(),
                password:$('#input-password-login').val()
            }
        })
        .done(function(response){
            const token=response.access_token
            localStorage.setItem('token',token)
            console.log(token)
            $('#signError').hide()
            $("#navbarUser").hide()
            $("#form-login").hide()
            $("#dashboardPage").show()
            $("#navbarTodo").show()
            fetchTodo()
            location.reload(true)
        })
        .fail(function(err){
            $('#signError').show()
            $('#signError').text(err.responseJSON.message)
        })
        $('#input-email-login').val("")
        $('#input-password-login').val("")
    })
    
    $('#add').on('click',function(e){
        $(".containerwow").hide()
        $("#addTodo").show()
        $("#editTodo").hide()
        $("#image").hide()
        $("#dashboardPage").hide()
        e.preventDefault()
    })

    $('#showImage').on('click',function(e){
        e.preventDefault()
        display()
        $("#dashboardPage").hide()
    })

    $(document).ready(function (e) {
        $('#upload').on('click', function () {
            const access_token=localStorage.getItem('token')
            var file_data = $('#file').prop('files')[0];
            var form_data = new FormData();
            form_data.append('file', file_data);
            console.log(form_data.get('file'))
            $.ajax({
                url: 'http://localhost:3000/imgur/upload', // point to server-side controller method
                dataType: 'json', // what to expect back from the server
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                headers:{
                    access_token
                },
                success: function (response) {
                    $('#msg').html(response); // display success response from the server
                },
                error: function (response) {
                    $('#msg').html(response); // display error response from the server
                }
            });
        });
    });


})

function display(){
    $(".containerwow").show()
    $(`.containerwow`).empty()
    const access_token=localStorage.getItem('token')
    $.ajax({
        method:"GET",
        url:"http://localhost:3000/imgur/image",
        headers:{
            access_token
        }
    })
    .done(function(response){
        let temp=0
        for (let i = 0; i < response.data.length; i++) {
            if(i==0||i%3==0){
                temp++
                $(`.containerwow`).append(`
                <div class="row" id="baris${temp}">
                    <div class="col-sm">
                    <img src="${response.data[i].link}" class="img-responsive img-thumbnail"/>
                    </div>
                </div>`)
            }else{
                console.log(temp)
                $(`#baris${temp}`).append(` 
                <div class="col-sm">
                <img src="${response.data[i].link}" class="img-responsive img-thumbnail"/>
                </div>`)
            }
        }
        $("#image").show()
        $("#addTodo").hide()
        $("#editTodo").hide()
        console.log(response.data)
    })
    .fail(function(err){
        console.log(err.responseJSON)
    })
}

function createTodo(e){
    e.preventDefault()
    const access_token=localStorage.getItem('token')
    const title=$('#title').val()
    const description=$('#description').val()
    const status=$('#status').val()
    const due_date=$('#duedate').val()
    console.log(title,description,status,due_date)

    $.ajax({
        method:"POST",
        url:"http://localhost:3000/todos",
        headers:{
            access_token
        },
        data:{
            title,
            description,
            status,
            due_date
        }
    })
    .done(function(response){
            $("#bodyTable").append(`
            <tr>
                <td>${response.title}</td>
                <td>${response.description}</td>
                <td>${response.status}</td>
                <td>${response.due_date}</td>
            </tr>
            `)
            $("#addTodo").hide()
            location.reload(true)
    })
    .fail(function(err){
        console.log(err.responseJSON)
    })
}


function fetchTodo(){
    const access_token=localStorage.getItem('token')
    $.ajax({
        method:"GET",
        url:"http://localhost:3000/todos",
        headers:{
            access_token
        }
    })
    .done(function(response){
         $("#dashboardPage").show()
        response.forEach(element => {
            $("#bodyTable").append(`
            <tr>
                <td>${element.title}</td>
                <td>${element.description}</td>
                <td>${element.status}</td>
                <td>${element.due_date}</td>
                <td><button onclick= "editTodo(${element.id})" class="btn btn-outline-info">Edit</button> <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#staticBackdrop${element.id}">
                Delete</button></td>
            </tr>
            `)
            $("#body").append(` <div class="modal fade" id="staticBackdrop${element.id}" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Warning</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure to delete this Project?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="deleteTodo(${element.id})">Understood</button>
                    </div>
                    </div>
                </div>
            </div>`)
        });
        $("#addTodo").hide()
        $("#editTodo").hide()
        $("#image").hide()
    })
    .fail(function(err){
        console.log(err.responseJSON)
    })
}

function logout(){
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.clear()
        $("#form-login").hide()
        $("#form-register").hide()
        $("#dashboardPage").hide()
        $("#navbarUser").show()
        $("#navbarTodo").hide()
    });
    
}

function deleteTodo(id){
    const access_token=localStorage.getItem('token')
    $.ajax({
        method: "DELETE",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token
        }
    })
    .done(function(response){
        location.reload(true)
        console.log(response,'delete')
    })
    .fail(function(err){
        console.log(err.responseJSON)
    })
}

function editTodo(id){
    const access_token=localStorage.getItem('token')
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token
        }
    })
    .done(function(response){
        $("#editTodo").show()
        $("#id-edit").val(response.id)
        $("#title-edit").val(response.title)
        $("#description-edit").val(response.description)
        $("#status-edit").val(response.status)
        $("#duedate-edit").val(response.due_date)
        $("#addTodo").hide()
        $("#dashboardPage").hide()
        console.log(response,'edit')
    })
    .fail(function(err){
        console.log(err.responseJSON)
    })
}

function change(e){
    e.preventDefault()
    const access_token=localStorage.getItem('token')
    const id=$('#id-edit').val()
    const title=$('#title-edit').val()
    const description=$('#description-edit').val()
    const status=$('#status-edit').val()
    const due_date=$('#duedate-edit').val()
    $.ajax({
        method: "PUT",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token
        },
        data:{
            title,
            description,
            status,
            due_date
        }
    })
    .done(function(response){
        $("#editTodo").hide()
        location.reload(true)
        console.log(response)
        
    })
    .fail(function(err){
        console.log(err.responseJSON)
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url:"http://localhost:3000/user/google-login",
        method:"POST",
        headers:{
            google_token:id_token
        }
    })
    .done(function(response){
        localStorage.setItem('token',response.access_token)
        $('#signError').hide()
        $("#navbarUser").hide()
        $("#form-login").hide()
        $("#navbarTodo").show()
        // $("#dashboardPage").show()
        // fetchTodo()
        console.log(response)
    })
    .fail(function(err){
        console.log(err.responseJSON)
    })
}

// function uploadImage(){
//     const access_token=localStorage.getItem('token')
//     const file_data = $('#file').prop('files')[0];
//     var form_data = new FormData();
//     form_data.append('file', file_data)
//     console.log(form_data)
//     $.ajax({
//         url: `http://localhost:3000/imgur/upload`,
//         method: "POST",
//         headers: {
//             access_token
//         },
//         data:form_data
//         // {
//         //     image:$('#file').val()
//         // }
//     })
//     .done(function(response){
//         // console.log($('#file').val())
//         // // $('#msg').html(response);
//         // console.log(response)
//     })
//     .fail(function(err){
//         // $('#msg').html(err);
//         console.log(err.responseJSON)
//     })
// }