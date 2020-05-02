
function onSignIn(googleUser) {
    // kita mau kirim id_token ke backend untuk DITUKAR dgn access_token

    console.log('googleSignIn masukkk')
    var id_token = googleUser.getAuthResponse().id_token; //nih tukar nih
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/google-signin",
        data: { id_token }
    })
    .done(function(data){
        localStorage.setItem('access_token', data.access_token)
        console.log('mausuk atoken Google')
    })

    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut(e) {
    Swal.fire({
        title: 'Logging out now?',
        text: "You might have to Google sign in again to enter this page",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Log out please'
    })
    .then((result) => {
        if (result.value) {
            Swal.fire(
            'Google logging out..',
            'Thank you for using Fancy Todo :)',
            'success'
            )
            
            e.preventDefault()

            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
            localStorage.removeItem('access_token')

            $(".app").hide();
            $("#login").show();
        } 
        else if (result.dismiss === Swal.DismissReason.cancel) { 

        }
    })
    
}

function loginUser(){
    $.ajax({
        url: "http://localhost:3000/users/login",
        type: "POST",
        data: {
            email: $("#email-login").val(),
            password: $("#password-login").val()
        },
        success: function(data){
            localStorage.setItem("access_token", data.access_token)
            showTodo()
        }
    })
    .done(function(){
        $(".app").hide()
        showTodo()
    })
}

function registerUser() {
    $.ajax({
        url: "http://localhost:3000/users/register",
        type: "POST",
        data: {
            email: $("#email-register").val(),
            password: $("#password-register").val()
        },
        success: function(data){
            localStorage.setItem("access_token", data.access_token)
        }
    })
}

function addTodo(event){
    // event.preventDefault()
    // var todo
    $.ajax({
        url:"http://localhost:3000/todos",
        type:"POST",
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title: $('#add-title').val(),
            description: $('#add-description').val(),
            due_date: $('#add-due_date').val()
        }
    })
    .done(function(response){
        //add here
        $(".app").hide()
        $("#todolist").show();
        showTodo()
    })
    .fail()
    .always()
}

function toFormEdit(id){ //for url id 
    console.log('kepanggil')
    $.ajax({
        url:`http://localhost:3000/todos/${id}`,
        type:"GET",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(function(response){
        //get here
        console.log(response)
        const {id, title, description, status, due_date} = response

        var $temp = `
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="edit-title" value="${title}">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="edit-description" value="${description}">
                
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <input type="text" class="form-control" id="edit-status" value="${status}">
            </div>
            <div class="form-group">
                <label for="due_date">Due Date</label>
                <input type="text" class="form-control" id="edit-due_date" value="${due_date}">
            </div>

            <button type="submit" class="btn btn-success" id="edit-update" onclick="editTodo(event, ${id})">Update</button>
            <button class="btn btn-danger list" id="btn-list-from-edit">Cancel</button>
            `
        // $("#edit-form").append($temp); //untuk menambah
        $("#edit-form").html($temp); // mengubah isi
        $(".app").hide();
        $("#edit").show();
        
    })
}

function editTodo(event, id){
    console.log(id, '===============ID UTK editTodo')
    event.preventDefault()
    // var todo
    $.ajax({
        url:`http://localhost:3000/todos/${id}`,
        type:"PUT",
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title: $('#edit-title').val(),
            description: $('#edit-description').val(),
            status: $('#edit-status').val(),
            due_date: $('#edit-due_date').val()
        }
    })
    .done(function(response){
        // sembunyikan semua tampilan (form) .app
        // tampilkan html list todo smaa seperti peratama klai masuk halaman
        // melkaukan pengisian table todo sama seperti masuk halaman
        $(".app").hide()
        $("#todolist").show();
        showTodo()
    })
    .fail()
    .always()
}

function getATodo(id){ //for url id
    console.log('kepanggil')
    $.ajax({
        url:`http://localhost:3000/todos/${id}`,
        type:"GET",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(function(response){
        const {id, title, description, status, due_date, UserId} = response

        var $temp = `
            <h5>Todo Details of</h5>
            <h1>User ID #${UserId}</h1>
            <div class="form-group">
                <label for="id">Todo Number</label>
                <input readonly type="text" class="form-control" id="findatodo-id" value="${id}">
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input readonly type="text" class="form-control" id="findatodo-title" value="${title}">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input readonly type="text" class="form-control" id="findatodo-description" value="${description}">
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <input readonly type="text" class="form-control" id="findatodo-status" value="${status}">
            </div>
            <div class="form-group">
                <label for="due_date">Due Date</label>
                <input readonly type="text" class="form-control" id="findatodo-due_date" value="${due_date}">
            </div>

            <button class="btn btn-primary list" id="btn-list-from-findatodo">Go Back</button>
            `
        // $("#findatodo-form").append($temp); //untuk menambah
        $("#findatodo-form").html($temp); // mengubah isi
        $(".app").hide();
        $("#findatodo").show();
    })
    .fail()
    .always()
}

function toDeleteTodo(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
        if (result.value) {
            Swal.fire(
            'Deleted!',
            'Your todo has been deleted.',
            'success'
            )
            $.ajax({
                url:`http://localhost:3000/todos/${id}`,
                type:"DELETE",
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .done(function(response){
                //get here
                console.log(response, 'DELETE RESPONSE DARI toDeleteTodo ==============')
                
                $(".app").hide()
                $("#todolist").show();
                showTodo()
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) { }
    })
}

function showTodo(){
    $.ajax({
        url:"http://localhost:3000/todos",
        type:"GET",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
        
    })
    .done(function(response){
        $("#table-todo tbody").empty();
        var $temp = ''
        for (let i = 0; i < response.length; i++) {
            const {id, title, description, status, due_date, UserId} = response[i]
            $temp += `
                <tr>
                    <td> ${id} </td>
                    <td>
                        <div class="form-check">
                            <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="...">
                        </div>
                    </td>
                    <td> ${title} </td>
                    <!--<td> ${description} </td>-->
                    <td> ${status} </td>
                    <td> ${due_date} </td>
                    <!--<td> ${UserId} </td>-->
                    </div>
                    <td>
                        <button class="btn btn-success" id="btn-show" onclick="getATodo(${id})">Show</button>
                        <button class="btn btn-primary" id="btn-edit" onclick="toFormEdit(${id})">Edit</button>
                        <button type="button" class="btn btn-danger" id="btn-delete" onclick="toDeleteTodo(${id})">Delete</button>
                    </td>
                </tr>
            `
            // console.log('>>>> response: ', $temp)
        }
        // $("#table-todo tbody").append($temp);
        $("#table-todo tbody").html($temp);
        
    })
    
}