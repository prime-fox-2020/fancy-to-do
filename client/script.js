$(document).ready( () => {
    setUp()
    toggleSignIn()
    
    $(".changeSignIn").click( e => {
        e.preventDefault()
        toggleSignIn()
    })
    $(".changeSignUp").click( e => {
        e.preventDefault()
        toggleSignUp()
    })
    $("#signup-form").submit( e => {
        e.preventDefault()
        const email = $("#signUpEmail").val()
        const password = $("#signUpPassword").val()
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/register",
            data: {email, password}
        })
        .done( data =>{
            $("#signUpEmail").val("")
            $("#signUpPassword").val("")
            toggleSignIn()
        })
        .fail( response => {
            $(".alert-signup").text(response.responseJSON.message)
        })
    })
    $("#signin-form").submit( e => {
        getTodos()
        e.preventDefault()
        const email = $("#loginEmail").val()
        const password = $("#loginPassword").val()
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/login",
            data: {email, password}
        })
        .done( data =>{
            localStorage.setItem('access_token', data.access_token)
            toggleYourListTodo()
        })
        .fail( response => {
            $(".alert-signin").text(response.responseJSON.message)
        })
  
    })
    $(".todo-add").submit( e => {
        e.preventDefault()

        const token = localStorage.getItem('access_token')
        const imageUrl = uploadImg()
        const title = $("#todo-name").val()
        const description = $("#todo-description").val()
        const due_date = $("#todo-due_date").val()
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/todos",
            dataType: 'json',
            data: {
                'title': title, 
                'description' : description, 
                'due_date' : due_date, 
                'imageurl' : imageUrl,
                'status' : false
            },
            headers: {
                'access_token' : token
            }
        })
        .done( data => {
            const date = data.due_date.substring(0,10).split('-').reverse().join('/')
            const todo = `
            <div class="card m-3 todo-datas" style="width: 16rem;" data-id="${data.id}">
                <img class="card-img-top" src="${data.imageurl}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${data.title} ${data.status? '&#10004' : ''} <button type="button" class="btn btn-primary-outline" onclick="getEditData(${data.id})"> &#x2699; </button> </h5>
                    <p class="card-text description">${data.description}</p>
                    <p class="card-text due-date">Due date : ${date}</p>
                    <div class="row">
                        <div class="col"><button class="btn btn-success" type="button" onclick="updateTodo(${data.id}, ${data.status}, '${data.title}')">Update</button></div>
                        <div class="col"><button class="btn btn-danger delete-todo" type="button" onclick="deleteTodo(${data.id})" data-id="${data.id}">Remove</button></div>
                    </div>
                </div>
            </div>`
            $("#todo-name").val("")
            $("#todo-description").val("")
            $("#todo-due_date").val("")
            $(".alert-edit").text("")
            $(".alert-add").text("")
            $('#column-todo').append(todo)   
        })
        .fail( response => {
            $(".alert-add").text(response.responseJSON.message)
            $(".alert-add").show()
        })
    })
    $('.todo-edit').submit( e => {
        e.preventDefault()
        const token = localStorage.getItem('access_token')
        const title = $("#todo-name-edit").val()
        const description = $("#todo-description-edit").val()
        const due_date = $("#todo-due_date-edit").val()
        const date = due_date.substring(0,10).split('-').reverse().join('/')
        const id = $("#todo-id-edit").val()
        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/todos/" + id,
            dataType: 'json',
            data: {
                'title': title, 
                'description' : description, 
                'due_date' : due_date, 
            },
            headers: {
                'access_token' : token
            }
        })
        .done( () =>{
            $("#todo-name-edit").val("")
            $("#todo-description-edit").val("")
            $("#todo-due_date-edit").val("")
            toggleAddTodo()
            $(".alert-edit").text("")
            $(".alert-add").text("")
            $('.todo-datas[data-id=' + id + ']').find('h5.card-title').html(`${title} <button type="button" class="btn btn-primary-outline" onclick="getEditData(${id})"> &#x2699; </button>`);
            $('.todo-datas[data-id=' + id + ']').find('p.description').html(description);
            $('.todo-datas[data-id=' + id + ']').find('p.due-date').html(`Due date : ${date}`);
        })
        .fail( response => {
            $(".alert-edit").text(response.responseJSON.message)
        })
    })
    
})

function setUp(){
    $("#signup-form").hide()
    $("#signin-form").hide()
    $("#yourListTodo").hide()
    $(".todo-edit").hide()    
}

function toggleSignIn(){
    $("#signup-form").hide()
    $("#signin-form").show()
    $(".alert-signin").text("")
}

function toggleSignUp(){
    $("#signup-form").show()
    $("#signin-form").hide()
    $(".alert-signup").text("")
}

function toggleYourListTodo(){
    $("#yourListTodo").show()
    $("#signin-form").hide()
    $("#signup-form").hide()
}

function toggleAddTodo(){
    $(".todo-edit").hide()
    $(".todo-add").show()    
}

function toggleEditTodo(){
    $(".todo-edit").show()
    $(".todo-add").hide()  
}

function getTodos(){
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            'access_token' : localStorage.getItem('access_token')
        }
    })
    .done( data => {
        let todos = ``
        for(let i = 0; i < data.length; i++){
            const date = data[i].due_date.substring(0,10).split('-').reverse().join('/')
            let color
            data[i].status ? color = 'aquamarine' : color = 'white' 
            todos += `
            <div class="card m-3 todo-datas" style="width: 16rem; background-color: ${color};" data-id="${data[i].id}">
                <img class="card-img-top" src="${data[i].imageurl}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${data[i].title} ${data[i].status? '&#10004' : ''} <button type="button" class="btn btn-primary-outline" onclick="getEditData(${data[i].id})"> &#x2699; </button> </h5>
                    <p class="card-text description">${data[i].description}</p>
                    <p class="card-text due-date">Due date : ${date}</p>
                    <div class="row">
                        <div class="col"><button class="btn btn-success" type="button" onclick="updateTodo(${data[i].id}, ${data[i].status}, '${data[i].title}')">Update</button></div>
                        <div class="col"><button class="btn btn-danger delete-todo" type="button" onclick="deleteTodo(${data[i].id})" data-id="${data[i].id}")">Remove</button></div>
                    </div>
                </div>
            </div>`
        }
        $('#column-todo').html(todos)   
    })
}

function uploadImg(){
    let imageUrl
    var $files = $('input[type=file]').get(0).files;
    
    if ($files.length) {
        // Reject big files
        if ($files[0].size > $(this).data('max-size') * 1024) {
        console.log('Please select a smaller file');
        return false;
        }

        // Begin file upload
        console.log('Uploading file to Imgur..');

        // Replace ctrlq with your own API key
        var apiUrl = 'https://api.imgur.com/3/image';
        var apiKey = '546c25a59c58ad7';

        var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
            Authorization: 'Client-ID ' + apiKey,
            Accept: 'application/json',
        },
        mimeType: 'multipart/form-data',
        };

        var formData = new FormData();
        formData.append('image', $files[0]);
        settings.data = formData;

        // Response contains stringified JSON
        // Image URL available at response.data.link
        $.ajax(settings).done(function (response) {
            imageUrl = JSON.parse(response).data.link
        });
    }
    $('input[type=file]').val("")
    return imageUrl
}

function deleteTodo(id){
    if (confirm("Are you sure?")) {
        const token = localStorage.getItem('access_token')
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/todos/" + id,
            headers: {
                'access_token' : token
            }
        })
        .done( () =>{
            $(".todo-datas[data-id=" + id + "]").remove()
            getTodos()
        })  
        .fail( response => {
            $(".alert-access").text(response.responseJSON.message)
            $(".alert-access").show()
        })
    }
    return false;
}

function getEditData(id){    
    const token = localStorage.getItem('access_token')
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/todos/" + id,
        headers: {
            'access_token' : token
        }
    })
    .done( (data) =>{
        toggleEditTodo()
        $("#todo-name-edit").attr("value", `${data.title}`)
        $("#todo-id-edit").attr("value", `${data.id}`)
    })
    .fail( response => {
        $(".alert-access").text(response.responseJSON.message)
        $(".alert-access").show()
    })
}

function updateTodo(id, status, title){
    let updateStatus 
    status ? updateStatus = false : updateStatus = true
    const token = localStorage.getItem('access_token')
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/todos/" + id,
        headers: {
            'access_token' : token
        },
        data: {
            'status' : updateStatus
        },
    })
    .done( () => {
        $('.todo-datas[data-id='+ id + ']').css('background-color', `${updateStatus? 'aquamarine' : 'white'}`)
        $('.todo-datas[data-id='+ id + ']').find('h5.card-title').html(`${title} ${updateStatus? '&#10004' : ''} <button type="button" class="btn btn-primary-outline" onclick="getEditData(${id})"> &#x2699; </button>`);
    })
    .fail( response => {
        $(".alert-access").text(response.responseJSON.message)
        $(".alert-access").show()
    })
}