$(document).ready(function() {
	$('.allbox').hide();

    


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
            // $('#addTodoModal').modal('hide');
            $('#title').val('');
            $('#description').val('');
            $('#status').val('');
            $('#due_date').val('');
            // $('#errorAdd').hide();
            getTodos()
          })
          .fail(function(response){
            console.log('gagal add todos', response)
        })
      })
  
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
              cek()
		  })
		  .fail(function(response) {
		  	console.log('gagal log-in', response);
		  })
		  .always(function(response) {
		  	console.log('always', response);
		  });
    });
    
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
            $("#loginform").append(`<p style="color: green; margin: 3% 45%;">Register Success</p>`)
		  })
		  .fail(function(response) {
		  	console.log('gagal regis', response);
		  })
		  .always(function(response) {
		  	console.log('always', response);
		  });
    });
    
    $('#logoutform').submit(function(e) {
        localStorage.clear()
        cek()
    })

    

  

if (localStorage.getItem('access_token')) {
  $('#add-todo').show();
  $('#get-todo').show();
} else {
  $('#loginbox').show();
  $('#regisbox').show();
}

// $('#register-button').click(function() {
// $('.joey').hide();
// $('#register').show();
// });

// $('#log-in-button').click(function() {
// 	$('.joey').hide();
// 	$('#log-in').show();
// });
});

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
            <td><button type="submit" class="btn btn-primary mb-2">Edit</button>
            <a class="btn btn-danger btn-sm" href="#" role="button" onclick="deleteTodo(${response[i].id})">Delete</a></td>
            </tr>`;
  			$('#get-todo tbody').append($new_row);
          }
      })
      .fail(function(response){
          console.log('gagal get todos', response)
      })
    }

function cek(){
    if (localStorage.getItem('access_token')) {
      $('#get-todo').show();
      $('#add-todo').show();
      $('#loginbox').hide();
      $('#regisbox').hide();
      $('#logoutbox').show();
       getTodos();
    } else {
      $('#loginbox').show();
    }
   }

function deleteTodo(id) {
    const token = localStorage.getItem('access_token');
    $.ajax({
        method: 'delete',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: token
        }
    })
        .done(data => {
            cek()
        })
        .fail(err => {
            console.log(err)
        })
} 