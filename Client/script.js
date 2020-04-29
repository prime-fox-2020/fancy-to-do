function renderHome() {
  $('div.container').html(`
    <div class="jumbotron">
      <h1 class="display-4">Welcome to TodoApp</h1>
      <p class="lead">Login To access TodoApp</p>
      <a class="btn btn-success btn-lg" id="login" role="button">Login</a>
      <hr class="my-4">
      <p>Didn't have account?</p>
      <a class="btn btn-primary btn-lg" id="register" role="button">Register</a>
    </div>
  `);
}

function renderLogin() {
  $('div.container').html(`
    <h2 class="mt-3">User Login</h2>
    <form class="mt-3 user-login">
      <div class="form-group" method="POST">
        <label for="email">Email address</label>
        <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" class="form-control" id="password">
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  `);
}

function renderRegister() {
  $('div.container').html(`
    <h2 class="mt-3">User Register</h2>
    <form class="mt-3 user-register">
      <div class="form-group" method="POST">
        <label for="email">Email address</label>
        <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" class="form-control" id="password">
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  `)
}

function showTodo(todos) {
  $('#login').hide();
  $('#register').hide();
  $('#logout').show();

  let list = `
  <h1 class="mt-3">Todo List</h1>
  <button class="btn btn-primary" id="add" data-toggle="modal" data-target="#add-todo">Add</button>
  <table class="table mt-3">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Status</th>
      <th scope="col">Due Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  `;

  todos.forEach(todo => {
    list += `
    <tr>
      <th scope="row">${todo.title}</th>
      <td>${todo.description}</td>
      <td>${todo.status}</td>
      <td>${todo.due_date}</td>
      <td>
        <button class="btn btn-success" data-id="${todo.id}" id="edit">Edit</button>   
        <button class="btn btn-danger" data-id="${todo.id}" id="delete">Delete</button>
    </tr>
    `;
  })

  list += `
  </tbody>
  </table>
  `;
  $('.container').html(list);
}

function renderTodo() {
  const { access_token } = localStorage;
  $.ajax({
    url: 'http://localhost:3000/todos',
    type: 'GET',
    headers: {
      access_token
    }
  })
  .done(function(res) {
    showTodo(res);
    console.log( "success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
}

// menampilkan login form
$('#login').on('click', () => {
  renderLogin();
})
$('.container').on('click', '#login', () => {
  renderLogin();
})

//menampilkan register form
$('#register').on('click', () => {
  renderRegister();
})
$('.container').on('click', '#register', () => {
  renderRegister();
})

//menampilkan halaman home
$('#home').on('click', () => {
  if (!localStorage.getItem('access_token')) {
    renderHome();
  }
})

//logika untuk login
$('.container').on('submit', 'form.user-login', e => {
  $.ajax({
    url: 'http://localhost:3000/login',
    type: "POST",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      "email": $("#email").val(),
      "password": $("#password").val()
    })
  })
  .done(function(res) {
  localStorage.setItem('access_token', res.access_token);
  console.log(localStorage);
  renderTodo();
  console.log( "success" );
  })
  .fail(function(res) {
  console.log( "error:", res );
  })
  .always(function() {
  console.log( "complete" );
  });
  e.preventDefault();
});

//register
$('.container').on('submit', 'form.user-register', e => {
  $.ajax({
    url: 'http://localhost:3000/register',
    type: "POST",
    contentType: "application/json;charset=utf-8",
    data: JSON.stringify({
      "email": $("#email").val(),
      "password": $("#password").val()
    })
  })
  .done(function(res) {
    $('div.container').html(`
      <div class="jumbotron">
        <h1 class="display-4">Register Success</h1>
        <p class="lead">Login To access TodoApp</p>
        <a class="btn btn-success btn-lg" id="login" role="button">Login</a>
      </div>
    `);
    console.log( "success >>", res );
  })
  .fail(function(err) {
    console.log( "error >>", err );
  })
  .always(function() {
    console.log( "complete" );
  });
  e.preventDefault();
})

//jika sudah ada access_token, maka tampilkan todo list.
$( document ).ready(function() {
  if (localStorage.getItem('access_token')) {
    renderTodo();
  }
});

//logout
$('#logout').hide();

$('#logout').on('click', () => {
  localStorage.removeItem('access_token');
  $('#login').show();
  $('#register').show();
  $('#logout').hide();
  renderHome();
})

/* CREATE, UPDATE, DELETE */

//create todo
$('.todo-add').on('submit', e => {
  const todo = {
    title: $('#title').val(),
    description: $('#description').val(),
    status: $('#status').val(),
    due_date: $('#due_date').val()
  }
  console.log(todo);
  $.ajax({
    url: 'http://localhost:3000/todos',
    type: "POST",
    contentType: "application/json;charset=utf-8",
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: JSON.stringify(todo)
  })
  .done(function(res) {
    $('#add-todo').modal('hide');
    $('#title').val('');
    $('#description').val('');
    $('#status').val('');
    $('#due_date').val('');
    renderTodo();
    console.log( "success >>", res );
  })
  .fail(function(err) {
    console.log( "error >>", err );
  })
  .always(function() {
    console.log( "complete" );
  });
  e.preventDefault();
})

//delete todo
$('.container').on('click', '[id=delete]', el => {
  const id = el.target.dataset.id;
  $('.modal-body-delete').html(`<br><h4 style="text-align: center;">Delete this Todo?</h4><br>`);
  $('#delete-todo').modal('show');
  $('#delete-button').on('click', el => {
    deleteTodo(id);
  })
})

function deleteTodo(id) {
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    type: 'DELETE',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(function(res) {
    $('#delete-todo').modal('hide');
    renderTodo();
    console.log( "success >>", res );
  })
  .fail(function(err) {
    console.log( "error >>", err );
  })
  .always(function() {
    console.log( "complete" );
  });
}