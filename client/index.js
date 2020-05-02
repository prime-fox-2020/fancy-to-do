// const Swal = require('sweetalert2')
$(document).ready(function() {
	$('#add-button').hide();
	$('.joey').hide();
	$('#update-todos-form').hide();

	if (localStorage.getItem('access_token')) {
		$('#todos').show();
	} else {
		$('#log-in').show();
	}

	$('#log-in-form').submit(function(e) {
		e.preventDefault();
		console.log('submit');
		const email = $('.input-email-log-in').val();
		const password = $('.input-password-log-in').val();
		console.log(email);
		console.log(password);

		$.ajax({
			url: 'http://localhost:3000/login',
			type: 'POST',
			data: {
				email: email,
				password: password
			}
		})
			.done(function(response) {
        console.log(response)
				console.log('sukses log-in', response.access_token);
				localStorage.setItem('access_token', response.access_token);
				$('.input-email-log-in').val('');
				$('.input-password-log-in').val('');
        cek();
       
			})
			.fail(function(response) {
       
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: response.responseJSON.message
					
				});
			})
			.always(function(response) {
				console.log('always login', response);
			});
	});

	$('#question-button').click(function() {
		$('#question-button').hide();
		$('#log-in').hide();
		$('#register').show();
		console.log('click');
	});

	$('#register-form').submit(function(e) {
		e.preventDefault();
		console.log('submit');
		const emailRegis = $('.input-email-register').val();
		const passwordRegis = $('.input-password-register').val();
		const nameRegis = $('.input-name-register').val();
		console.log(emailRegis);
		console.log(passwordRegis);

		$.ajax({
			url: 'http://localhost:3000/register',
			type: 'POST',
			data: {
				email: emailRegis,
				password: passwordRegis,
				name: nameRegis
			}
		})
			.done(function(response) {
				console.log('sukses register', response);
				$('.input-email-register').val('');
				$('.input-password-register').val('');
				$('.input-name-register').val('');
				cek();
			})
			.fail(function(response) {
        console.log('gagal register', response);
        // let error = ''
        // for (let i = 0; i < response.responseJSON.message.length; i++) {
				// 	error += response.responseJSON.message[i] + ',';
				// }

				let error = '';
				for (let i = 0; i < response.responseJSON.message.length; i++) {
					error += response.responseJSON.message[i] + ',';
				}

				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error,
					footer: '<a href>Need help?</a>'
				});
			})
			.always(function(response) {
				console.log('always register', response);
			});
	});

	$('#add-todos-form').submit(function(e) {
		const token = localStorage.getItem('access_token');
		e.preventDefault();
		console.log('sumbit-form');
		const title = $('#input-title-todos').val();
		const description = $('#input-description-todos').val();
		const due_date = $('#input-due_date-todos').val();
		const status = $('#input-status-todos').val();
		console.log(title, description, due_date, status);

		$.ajax({
			url: 'http://localhost:3000/todos',
			type: 'POST',
			data: {
				title: title,
				description: description,
				due_date: due_date,
				status: status
			},
			headers: {
				access_token: token
			}
		})
			.done(function(response) {
				$('#input-title-todos').val('');
				$('#input-description-todos').val('');
				$('#input-due_date-todos').val('');
				$('#input-status-todos').val('');
				console.log('sukses-tambah-todos', response);
				getTodos();
			})
			.fail(function(response) {
				$('#input-title-todos').val('');
				$('#input-description-todos').val('');
				$('#input-due_date-todos').val('');
				$('#input-status-todos').val('');
				console.log('gagal-tambah-todos', response.responseJSON);
				let error = '';
				for (let i = 0; i < response.responseJSON.message.length; i++) {
					error += response.responseJSON.message[i] + ',';
				}

				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error,
					footer: '<a href>Need help?</a>'
				});
			})
			.always(function(response) {
				console.log('always-tambah-todos', response);
			});
	});

	$('#register-button').click(function() {
		$('.joey').hide();
		$('#register').show();
	});

	$('#log-in-button').click(function() {
		$('.joey').hide();
		$('#log-in').show();
	});
	$('#add-button').click(function() {
		$('#add-todos-form').show();
		$('#add-button').hide();
	});

	$('#log-out-button').click(function(){
	
		localStorage.clear();
		cek()
		var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
    console.log('User signed out.');
});
		
	})
});

function confirmDeleteTodo(id){
	$('#deleteModal').modal('show')
	$("#delete-id").val(id)
}

function deleteTodo() {
	const token = localStorage.getItem('access_token');
	const id = $('#delete-id').val()
	$.ajax({
		method: 'delete',
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: token
		}
	})
		.done((data) => {
			$('#deleteModal').modal('hide')
			getTodos();
		})
		.fail((err) => {
			console.log(err);
		});
}

function getTodos() {
	const token = localStorage.getItem('access_token');
	$.ajax({
		url: 'http://localhost:3000/todos',
		type: 'GET',
		headers: {
			access_token: token
		}
	})
		.done(function(response) {
			let todo = response.Todo;
			$('#todos tbody').empty();
			for (let i = 0; i < todo.length; i++) {
				let new_row = `
        <tr>
         <td>${todo[i].title}</td>
         <td>${todo[i].description}</td>
         <td>${todo[i].status}</td>
         <td>${todo[i].due_date}</td>
        <td> <a class="btn btn-danger btn-sm" href="#" role="button" onclick="confirmDeleteTodo(${todo[i].id})">Delete</a>
        || <a class="btn btn-warning btn-sm" href="#" role="button" onclick="editTodo(${todo[i].id})">Edit</a></td> 
         </tr>`;
				$('#todos tbody').append(new_row);
			}
			console.log(response);
		})
		.fail(function(response) {
			console.log('gagal get todos', response);
		});
}

function cek() {
	if (localStorage.getItem('access_token')) {
		$('#todos').show();
		$('#log-in').hide();

		getTodos();
	} else {
		$('#log-in').show();
		$('#question-button').show()
		$('#todos').hide();
		$('#register').hide();
		$('.question-class').hide();
	}
}



function editTodo(id) {
	const token = localStorage.getItem('access_token');

	$.ajax({
		method: 'GET',
		url: `http://localhost:3000/todos/${id}`,
		headers: {
			access_token: token
		}
	})
		.done((res) => {
			let todo = res.todo;
			$('#update-todos-form').show();
			$('#add-todos-form').hide();
			$('#update-title-todos').val(todo.title);
			$('#update-description-todos').val(todo.description);
			$('#update-due_date-todos').val(todo.due_date);
			$('#update-status-todos').val(todo.status);
			updateTodo(todo.id);
		})
		.fail((err) => {
			console.log(err, 'ini error edit todo');
		})
		.always((response) => {
			console.log(response, 'always edit todo');
		});
	}

	let identitas;
	function updateTodo(id) {
		identitas = id;
		return identitas;
	}

	//Update Todos Form
	$('#update-todos-form').submit(function(e) {
		const token = localStorage.getItem('access_token');
		e.preventDefault();
		console.log('update-form');
		const title = $('#update-title-todos').val();
		const description = $('#update-description-todos').val();
		const due_date = $('#update-due_date-todos').val();
		const status = $('#update-status-todos').val();
		console.log(title, description, due_date, status);
		$.ajax({
			url: `http://localhost:3000/todos/${identitas}`,
			type: 'PUT',
			data: {
				title: title,
				description: description,
				due_date: due_date,
				status: status
			},
			headers: {
				access_token: token
			}
		})
			.done(function(response) {
				$('#update-title-todos').val('');
				$('#update-description-todos').val('');
				$('#update-due_date-todos').val('');
				$('#update-status-todos').val('');
				console.log('sukses-tambah-todos', response);
				$('#update-todos-form').hide();
				$('#add-todos-form').hide();
				$('#add-button').show();
				getTodos();
			})
			.fail(function(response) {
				$('#update-title-todos').val('');
				$('#update-description-todos').val('');
				$('#update-due_date-todos').val('');
				$('#update-status-todos').val('');
				console.log('gagal-tambah-todos', response.responseJSON);
				let error = '';
				for (let i = 0; i < response.responseJSON.message.length; i++) {
					error += response.responseJSON.message[i] + ',';
				}

				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error,
					footer: '<a href>Need help?</a>'
				});
			})
			.always(function(response) {
				console.log('always-tambah-todos', response);
			});
	});

	//Google Sign-In
	 function onSignIn(googleUser) {
		 
	var id_token = googleUser.getAuthResponse().id_token
	console.log(id_token)
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/google-sign-in',
		data: {'id_token': id_token}
		

	})
	.done(data=>{
		localStorage.setItem('access_token', data.access_token)
		console.log(data, 'suskes-sign-in')
		cek()
	})
	.fail(err=>{
		console.log(err, 'errorr sign-in')
	})




}

