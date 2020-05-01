$(document).ready(function() {
  // $('.allbox').hide();
  checkStorage()

  //ADD TODO FORM CLICK
  $('#add-todo-form').submit(function(e) {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const title = $('#title').val();
    const description = $('#description').val();
    const status = $('#status').val();
    const due_date = $('#due_date').val();
    $.ajax({
      url: `http://localhost:3000/todos`,
      type: "POST",
      data: {
        title : title,
        description : description,
        status : status,
        due_date : due_date
      },
      headers: {
        access_token : token
      }
    })
      .done(response => {
        $('#title').val('');
        $('#description').val('');
        $('#status').val('');
        $('#due_date').val('');
        getTodos()
      })
      .fail(function(response){
        const err = response.responseJSON.message
        let errMessage = ''
        for(let i = 0; i < err.length; i++){
          errMessage += err[i]
        }
        $('#erroradd').show()
        $("#erroradd").text(errMessage)
    })
  })
  
  //LOGIN FORM CLICK
	$('#loginform').submit(function(e) {
		e.preventDefault();
		const email = $('#emaillogin').val();
		const password = $('#passwordlogin').val();
		console.log(email);
		console.log(password);

		$.ajax({
		  url: 'http://localhost:3000/users/login',
		  type: 'POST',
		  data: {
		      email: email,
		      password: password
		  }
		  })
		  .done(function(response) {
        localStorage.setItem('access_token', response.access_token)
        $('#passwordlogin').val('');
        $('#emaillogin').val('');
        checkStorage()
      })
      .fail(function(response) {
        checkStorage()
        $('#errorlogin').show()
        $("#errorlogin").text(response.responseJSON.message)
        $('#passwordlogin').val('');
        $('#emaillogin').val('');
        $('#errorregis').hide()
		  })
		  .always(function(response) {
		  	console.log('always', response);
		  });
  });

    //REGISTER FORM CLICK
  $('#regisform').submit(function(e) {
		e.preventDefault();
		const email = $('#emailregis').val();
		const password = $('#passwordregis').val();
		$.ajax({
		  url: 'http://localhost:3000/users/register',
		  type: 'POST',
		  data: {
		      email: email,
		      password: password
		  }
		  })
		  .done(function(response) {
            $("#regisbox").hide()
            $('#loginbox').show();
		  })
		  .fail(function(response) {
        const err = response.responseJSON.message.errors
        let errMessage = ''
        for(let i = 0; i < err.length; i++){
          errMessage += (`${err[i].message}\n`)
        }
        $('#errorregis').show()
        $("#errorregis").text(errMessage)
        $('#passwordregis').val('');
        $('#emailregis').val('');
        $('#errorlogin').hide()
		  })
		  .always(function(response) {
		  	console.log('always', response);
		  });
  });
    

    $('#logoutform').submit(function(e) {
      e.preventDefault();
        localStorage.clear();
        checkStorage();
        $('#loginbox').show();
        $('#title').val("");
        $('#description').val("");
        $('#status').val("");
        $('#due_date').val("");
        $('#errorregis').hide()
        $('#errorlogin').hide()
        
        //googleSign Out
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
        console.log('User signed out.');
        });
    })

});

function showAdd(e){
  e.preventDefault()
  $('#edit-todo').hide();
  $('#add-todo').show();
  $('#errorEdit').hide();
}


function showLogin(e) {
  e.preventDefault();
  $('#loginbox').show();
  $('#regisbox').hide();
}

function showRegister(e) {
  e.preventDefault();
  $('#loginbox').hide();
  $('#regisbox').show();
}

function getTodos() {
    const token = localStorage.getItem('access_token');
  	$.ajax({
          url: 'http://localhost:3000/todos',
          type: 'GET',
          headers:{
            access_token : token
          }
      })
      .done(function(response) {
        $('#get-todo tbody').empty(); 
  		for (let i = 0; i < response.length; i++) {
  		  $new_row = `
            <tr>
            <td>${response[i].title}</td>
            <td>${response[i].description}</td>
            <td>${response[i].status}</td>
            <td>${response[i].due_date}</td>
            <td><button type="submit" class="btn btn-primary mb-2" onclick="editForm(${response[i].id})">Edit</button>
            <button type="submit" class="btn btn-danger mb-2" role="button" onclick="confirmDelete(${response[i].id})">Delete</button></td>
            </tr>`;
  			$('#get-todo tbody').append($new_row);
          }
      })
      .fail(function(response){
          console.log('gagal get todos', response)
      })
    }

  function checkStorage() {
    if(localStorage.access_token) {
      $('#regisbox').hide();
      $('#loginbox').hide();
      $('.notlogged-in').hide();
      // $('.logged-in').show();
      $('.afterlogin').show();
      $('#edit-todo').hide();
      getTodos();
    } else {
      $('#loginbox').show();
      $('#regisbox').hide();
      $('.afterlogin').hide();
      $('.notlogged-in').show();
      // $('.logged-in').hide();
    }
  }

  function confirmDelete(id) {
    const token = localStorage.getItem('access_token');
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/todos/${id}`,
      headers: {
        access_token : token
      }
    })
      .done(response => {
        console.log(response);
        $('#deleteModal').modal('show');
        $('#delete-id').val(response.id);
        $('.modal-body').val(`"${response.title}" ?`);
      })
      .fail(err => {
        console.log(err);
      });
  }


  function deleteTodo(event) {
    const token = localStorage.getItem('access_token');
    const id = $('#delete-id').val();
  
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:3000/todos/${id}`,
      headers: {
        access_token : token
      }
    })
      .done(response => {
        $('#deleteModal').modal('hide');
        getTodos()
      })
      .fail(err => {
        console.log(err);
      });
  }

  function editForm(value){
    const token = localStorage.getItem('access_token');
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/todos/${value}`,
      headers: {
      access_token : token
    }
  })
    .done(response => {
      $('#edit-todo').show();
      $('#add-todo').hide();
      $('#edit-id').val(response.id);
      $('#edit-title').val(response.title);
      $('#edit-description').val(response.description);
      $('#edit-status').val(response.status);
      $('#edit-due_date').val(response.due_date);
    })
    .fail(err => {
      console.log(err);
    });

  }

  function edit(e){
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const id = $('#edit-id').val();
    const title = $('#edit-title').val();
    const description = $('#edit-description').val();
    const status = $('#edit-status').val();
    const due_date = $('#edit-due_date').val();
  
    $.ajax({
      method: 'PUT',
      url: `http://localhost:3000/todos/${id}`,
      headers: {
        access_token : token
      },
      data: {
        title,
        description,
        status,
        due_date
      } 
    })
      .done(response => {
        e.preventDefault();
        $('#edit-todo').show();
        $('#add-todo').hide();
        getTodos()
        $('#edit-id').val('');
        $('#edit-title').val('');
        $('#edit-description').val('');
        $('#edit-status').val('');
        $('#edit-due_date').val('');
        $('#errorEdit').hide();
      })
      .fail(response => {
        const err = response.responseJSON.message
        let errMessage = ''
        for(let i = 0; i < err.length; i++){
          errMessage += err[i]
        }
        $('#erroredit').show()
        $("#erroredit").text(errMessage)
      });
  }

  function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/google-login',
      headers: {
        id_token: id_token
      }
    })
    .done(response => {
      console.log(response);
      localStorage.setItem('access_token', response.access_token);
      $('#passwordlogin').val('');
      $('#emaillogin').val('');
      checkStorage()
    })
    .fail(err => {
      console.log(err); 
    });
  
  }
  // localStorage.setItem('access_token', response.access_token)
  //       $('#passwordlogin').val('');
  //       $('#emaillogin').val('');
  //       checkStorage()