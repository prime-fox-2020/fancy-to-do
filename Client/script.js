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
  $('.g-signin2').hide();

  let list = `
  <h1 class="mt-3">Todo List</h1>
  <button class="btn btn-primary" id="add" data-toggle="modal" data-target="#add-todo">Add Todo</button>
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
    const {id, title, description, status, due_date} = todo;
    list += `
    <tr>
      <th scope="row" id="title${id}">${title}</th>
      <td id="description${id}">${description}</td>
      <td id="status${id}">${status}</td>
      <td id="due_date${id}">${due_date.substring(0,10)}</td>
      <td>
        <button class="btn btn-success" data-id="${id}" id="edit">Edit</button>   
        <button class="btn btn-danger" data-id="${id}" id="delete">Delete</button>
        <button class="btn btn-info" data-id="${id}" id="showQR">Show QR-Code</button>
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
  .fail(function(err) {
    errorHandle(err)
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
  .fail(function(err) {
    errorHandle(err)
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
    errorHandle(err)
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
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem('access_token');
  $('#login').show();
  $('#register').show();
  $('#logout').hide();
  $('.g-signin2').show();
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
    errorHandle(err);
    console.log( "error >>", err );
  })
  .always(function() {
    console.log( "complete" );
  });
  e.preventDefault();
})

//edit todo
$('.container').on('click', '[id=edit]', el => {
  const id = el.target.dataset.id;
  
  $('#edit-title').val();
  $('#edit-description').val();
  $('#edit-status').val();
  $('#edit-due_date').val();
  
  $('#edit-todo').replaceWith(`
  <div class="modal fade" id="edit-todo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Todo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="todo-edit">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" name="title" class="form-control" id="edit-title" value="${$(`#title${id}`)[0].textContent}">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" name="description" class="form-control" id="edit-description" value="${$(`#description${id}`)[0].textContent}">
            </div>
            <div class="form-group">
              <label for="status">Status</label>
              <input type="text" name="status" class="form-control" id="edit-status" value="${$(`#status${id}`)[0].textContent}">
            </div>
            <div class="form-group">
              <label for="due_date">Due Date</label>
              <input type="date" name="due_date" class="form-control" id="edit-due_date" value="${$(`#due_date${id}`)[0].textContent}">
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `);
  $('#edit-todo').modal('show');
  $('.todo-edit').on('submit', e => {
    const todo = {
      title: $('#edit-title').val(),
      description: $('#edit-description').val(),
      status: $('#edit-status').val(),
      due_date: $('#edit-due_date').val()
    }

    $.ajax({
      url: `http://localhost:3000/todos/${id}`,
      type: "PUT",
      contentType: "application/json;charset=utf-8",
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      data: JSON.stringify(todo)
    })
    .done(function(res) {
      console.log(id);
      $('#edit-todo').modal('hide');
      renderTodo();
      console.log('success >>', res);
    })
    .fail(function(err) {
      errorHandle(err)
      console.log( "error >>", err );
    })
    .always(function() {
      console.log( "complete" );
    });
    e.preventDefault();
  })
})

//delete todo
$('.container').on('click', '[id=delete]', el => {
  const id = el.target.dataset.id;
  $('#delete-todo').replaceWith(`
  <div class="modal fade" id="delete-todo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Warning!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h4 style="text-align: center;">Are you sure?</h4>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" id="delete-button">Delete Todo</button>
        </div>
      </div>
    </div>
  </div>
  `);
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
    errorHandle(err)
    console.log( "error >>", err );
  })
  .always(function() {
    console.log( "complete" );
  });
}

//google sign in
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/google-signin',
    contentType: "application/x-www-form-urlencoded",
    data: {
      idToken: id_token
    }
  })
  .done(data => {
    localStorage.setItem('access_token', data.access_token);
    console.log(localStorage);
    renderTodo();
  })
  .fail(err => {
    errorHandle(err)
    console.log('error', err);
  })
  .always(() => {
    console.log('Google signin complete');
  })
}

//show qr code, 3rd party api
$('.container').on('click', '[id=showQR]', el => {
  const id = el.target.dataset.id;
  const todo = {
    title: $(`#title${id}`)[0].textContent,
    description: $(`#description${id}`)[0].textContent,
    status: $(`#status${id}`)[0].textContent,
    due_date: $(`#due_date${id}`)[0].textContent
  }

  $('#qrCode').replaceWith(`
  <div class="modal fade" id="qrCode" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Scan this QR-Code!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img id="qrCode-img" alt="qr-code onload">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Done</button>
        </div>
      </div>
    </div>
  </div>
  `);
  $('#qrCode').modal('show');
  
  $.ajax({
    url: `http://localhost:3000/qr`,
    type: 'POST',
    contentType: "application/json;charset=utf-8",
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: JSON.stringify(todo)
  })
  .done(res => {
    $('#qrCode-img').attr('src', res.url);
    console.log(res);
  })
  .fail(err => {
    errorHandle(err)
    console.log('ada error ',err);
  })
  
})

function errorHandle(err) {
  $('#errorHandle').replaceWith(`
  <div class="modal fade" id="errorHandle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Error Message</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger">
            ${err}
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `);
  $('#errorHandle').modal('show');
}