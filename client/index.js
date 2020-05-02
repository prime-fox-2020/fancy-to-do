$(document).ready(() => {
    switchPage("home");
    $("#signUp-page").click(()=> switchPage("signUp"));
    $("#signIn-page").click(()=> {
        if (localStorage.access_token)
            switchPage("dashboard");
        else 
            switchPage("signIn"); 
    })
    $("#todo-add-btn").click(() => switchPage("add"));

    $("#signUp-form").submit((event)=> {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/user/register",
            data: {
                email: $("#signUp-email").val(),
                password: $("#signUp-password").val() }
        }).done(() => {
            alert("Success to register");
            $("#signUp-email").val("");
            $("#signUp-password").val("");
            switchPage("signIn");
        }).fail(() => alert("Fail to register"))
    })
    $("#signIn-form").submit((event) => {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/user/login",
            data: {
                email: $("#signIn-email").val(),
                password: $("#signIn-password").val() }
        }).done((response) => {
            localStorage.setItem("access_token", response.accessToken);
            alert("Success login");
            $("#signIn-email").val("");
            $("#signIn-password").val("");
            switchPage("dashboard");
        }).fail(() => alert("Failed to login"))
    })
    $("#todo-add-form").submit((event) => {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/todos",
            data: {
                title: $("#todo-title").val(),
                description: $("#todo-description").val(),
                due_date: $("#todo-due_date").val() },
            headers: {access_token: localStorage.access_token}
        }).done(() => {
            alert("Success added new task");
            $("#todo-title").val("");
            $("#todo-description").val("");
            $("#todo-due_date").val("");
            switchPage("dashboard");
        }).fail(() => alert("Fail to add new task"));
    })
    $("#todo-edit-form").submit((event) => {
        event.preventDefault();
        const id = $("#todo-edit-id").val();
        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/todos/${id}`,
            data: {
                id: $("#todo-edit-id").val(),
                title: $("#todo-edit-title").val(),
                description: $("#todo-edit-description").val(),
                due_date: $("#todo-edit-due_date").val(),
                status: $("#todo-edit-status").val() },
            headers: {access_token: localStorage.access_token}
        }).done(() => {
            alert("Success edit task");
            $("#todo-edit-title").val("");
            $("#todo-edit-description").val("");
            $("#todo-edit-due_date").val("");
            switchPage("dashboard");
        }).fail(() => alert("Fail to edit task"));
    })
})

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/user/googleLogin",
        data: {token_id: id_token} })
    .done((response) => {
        localStorage.setItem("access_token", response.accessToken)
        alert("Success to login with google account");
        switchPage('dashboard'); })
    .fail(() => alert("Fail to login with google account"));
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => alert('Successfully signed out'));
    localStorage.removeItem('access_token');
    switchPage("home");
}

function switchPage(page) {
    switch (page) {
        case 'home':
            $("#home").show();
            $("#signUp").hide(); $("#signIn").hide(); $("#todo-dashboard").hide(); $("#todo-add").hide(); $("#todo-edit").hide();
            break;
        case 'signUp':
            $("#signUp").show();
            $("#home").hide(); $("#signIn").hide(); $("#todo-dashboard").hide(); $("#todo-add").hide(); $("#todo-edit").hide();
            break;
        case 'signIn':
            $("#signIn").show();
            $("#home").hide(); $("#signUp").hide(); $("#todo-dashboard").hide(); $("#todo-add").hide(); $("#todo-edit").hide();
            break;
        case 'dashboard':
            $("#todo-dashboard").show();
            showList();
            $("#home").hide(); $("#signUp").hide(); $("#signIn").hide(); $("#todo-add").hide(); $("#todo-edit").hide();
            break;
        case 'add':
            $("#todo-add").show();
            $("#home").hide(); $("#signUp").hide(); $("#signIn").hide(); $("#todo-dashboard").hide(); $("#todo-edit").hide();
            break;
        case 'edit':
            $("#todo-edit").show();
            $("#home").hide(); $("#signUp").hide(); $("#signIn").hide(); $("#todo-dashboard").hide(); $("#todo-add").hide();
            break;
    }
}

function showList() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/todos",
        headers: {access_token: localStorage.access_token}
    })
    .done((response) => {
        let tableStr = "";
        for (const todo of response) {
            const {id, title, description, due_date, status} = todo;
            tableStr += 
                `<tr>
                    <td>${title}</td>
                    <td>${description}</td>
                    <td>${status}</td>
                    <td>${due_date}</td>
                    <td>
                        <a class="btn btn-danger btn-sm" href="#" role="button" onclick="confirmDeleteTodo(${id})">Delete</a>
                        <a class="btn btn-warning btn-sm" href="#" role="button" onclick="editTodo(${id})">Edit</a>
                    </td>
                </tr>`
        }
        $("#todo-table").html(tableStr);
    })
    .fail((response) => {
        console.log(response);
    })
}

function confirmDeleteTodo(id){
	$('#deleteModal').modal('show');
	$("#delete-id").val(id);
}

function deleteTodo() {
	const token = localStorage.getItem('access_token');
	const id = $('#delete-id').val();
	$.ajax({
		method: 'delete',
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: token
		}
	})
    .done((data) => {
        data.preventDefault();
        $('#deleteModal').modal('hide');
        switchPage("dashboard");
    })
    .fail((err) => {
        console.log(err);
    });
}


function editTodo(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/todos/${id}`,
        headers: {access_token: localStorage.access_token}
    })
    .done((response) => {
        $("#todo-edit-id").val(response.id);
        $("#todo-edit-title").val(response.title);
        $("#todo-edit-description").val(response.description);
        $("#todo-edit-due_date").val(response.due_date);
        $("#todo-edit-status").val(response.status);
        switchPage('edit');
        $("#todo-edit-id").hide();
    })
    .fail((response) => console.log(response));
}
