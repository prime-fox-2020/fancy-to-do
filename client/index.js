$(document).ready(function() {
	$('.joey').hide();

	
  
	$('#log-in-form').submit(function(e) {
		e.preventDefault();
		console.log('submit');
		const email = $('.input-email-log-in').val();
		const password = $('.input-password-log-in').val();
		console.log(email);
		console.log(password);

		$.ajax({
			url: 'http://localhost:3000/user/login',
			type: 'POST',
			data: {
				email: email,
				password: password
			}
		})
			.done(function(response) {
        console.log('sukses log-in', response.access_token);
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

  $('#question-button').click(function(){
    $('#question-button').hide();
    $('#log-in').hide()
    $('#register').show()
    console.log('click')
  })

  $('#register-form').submit(function(e) {
		e.preventDefault();
		console.log('submit');
		const emailRegis = $('.input-email-register').val();
    const passwordRegis = $('.input-password-register').val();
    const nameRegis = $('.input-name-register').val();
		console.log(emailRegis);
		console.log(passwordRegis);

		$.ajax({
			url: 'http://localhost:3000/user/register',
			type: 'POST',
			data: {
				email: emailRegis,
        password: passwordRegis,
        name: nameRegis
			}
		})
			.done(function(response) {
        console.log('sukses register', response);
        
        cek()
			})
			.fail(function(response) {
				console.log('gagal register', response);
			})
			.always(function(response) {
				console.log('always register', response);
			});
	});


  

$('#add-todos-form').submit(function(e){
  const token = localStorage.getItem('access_token');
  e.preventDefault();
  console.log('sumbit-form')
  const title = $('#input-title-todos').val();
  const description = $('#input-description-todos').val();
  const due_date = $('#input-due_date-todos').val();
  const status = $('#input-status-todos').val()
  console.log(title, description, due_date, status)
  $.ajax({
    url: 'http://localhost:3000/todo',
			type: 'POST',
			data: {
				title: title,
        description: description,
        due_date: due_date,
        status: status
      },
      headers:{
        access_token : token
      }
  })
  .done(function(response) {
    $('#input-title-todos').val('');
    $('#input-description-todos').val('');
    $('#input-due_date-todos').val('');
    $('#input-status-todos').val('')
   console.log('sukses-tambah-todos', response)
   getTodos()
  })
  .fail(function(response) {
    console.log('gagal-tambah-todos', response);
  })
  .always(function(response) {
    console.log('always-tambah-todos', response);
  });
})


if (localStorage.getItem('access_token')) {
  $('#todos').show();
   
} else {
  $('#log-in').show();
}
	$('#register-button').click(function() {
		$('.joey').hide();
		$('#register').show();
	});

	$('#log-in-button').click(function() {
		$('.joey').hide();
		$('#log-in').show();
	});
});
function deleteTodo(id) {
  const token = localStorage.getItem('access_token');
  $.ajax({
  method: 'delete',
  url: `http://localhost:3000/todo/${id}`,
  headers: {
  access_token: token
  }
  })
  .done(data => {
   getTodos()
  })
  .fail(err => {
  console.log(err)
  })
  } 

  function getTodos() {
    const token = localStorage.getItem('access_token');
		$.ajax({
			url: 'http://localhost:3000/todo',
      type: 'GET',
      headers:{
        access_token : token
      }
		}).done(function(response) {
      let todo = response.Todo
			$('#todos tbody').empty();
			for (let i = 0; i < todo.length; i++) {
				let new_row = `
        <tr>
         <td>${todo[i].title}</td>
         <td>${todo[i].description}</td>
         <td>${todo[i].status}</td>
         <td>${todo[i].due_date}</td>
        <td> <a class="btn btn-danger btn-sm" href="#" role="button" onclick="deleteTodo(${todo[i].id})">Delete</a></td> 
         </tr>`;
				$('#todos tbody').append(new_row);
      }
      console.log(response)
    })
    .fail(function(response){
        console.log('gagal get todos', response)
    })
  }

  function cek(){
    if (localStorage.getItem('access_token')) {
      $('#todos').show();
      $('#log-in').hide();
     
       getTodos();
    } else {
      $('#log-in').show();
      $('#register').hide();
      $('.question-class').hide()
    }
}