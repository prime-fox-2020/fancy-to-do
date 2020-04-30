const url = 'http://localhost:3000'
let todos = []
let calendar =[]
let dataTodo;

$(document).ready(() => {
  $(".element").hide()

  if(localStorage.getItem("access_token")) {
    $('#todo-list').show()
    showTodo()
  } else {
    $('#login').show()
    $('#messageLogin').hide()
    $("#logout").hide()
  }

  $("#goto-register-btn").click(event => {
    event.preventDefault()
    $(".element").hide()
    $("#register").show()
    $('#messageRegist').hide()
  })

  $("#cancel-register-btn").click(event => {
    event.preventDefault()
    $(".element").hide()
    $("#login").show()
    $("#messageLogin").hide()
  })

  $(".form-login").submit(event => {
    event.preventDefault()
    login()
  })

  $(".form-register").submit(event => {
    event.preventDefault()
    register()
  })

  $(".form-add-todo").submit(event => {
    event.preventDefault()
    addTodo()
  })

  $('#logout').click(event => {
    event.preventDefault()
    signOut()
    localStorage.removeItem('access_token')
    $('.element').hide()
    $('#messageLogin').hide()
    $('#login').show()
    $("#logout").hide()
  })

  $('#add-todo-btn').click(event => {
    event.preventDefault()
    $('.element').hide()
    $('#add-todo').show()
    $('#msgAdd').hide()
  })

  $('#cancel-add-btn').click(event => {
    event.preventDefault()
    $('.element').hide()
    $('#todo-list').show()
  })

  $('#cancel-edit-btn').click(event => {
    event.preventDefault()
    $('.element').hide()
    $('#todo-list').show()
  })

  $("#delete-btn").click(event => {
    event.preventDefault()
    $(".modal").show()
  })

  $("#goto-todo-list").click(event => {
    event.preventDefault()
    $(".element").hide()
    $("#todo-list").show()
  })

  $("#goto-calendar").click(event => {
    event.preventDefault()
    $(".element").hide()
    $("#calendar").show()
    showCalendar()
  })

})

const login = () => {
  $.ajax({
    method: 'post',
    url: `${url}/login`,
    data: {
      email: $('#inputEmail').val(),
      password: $('#inputPassword').val()
    }
  })
  .done(data=> {
    const access_token = data.access_token
    localStorage.setItem('access_token', access_token)
    $('.element').hide()
    $('#todo-list').show()
    $('#logout').show()
    showTodo()
  })
  .fail(err=>{
    $('#errLogin').text(err.responseJSON.message)
    $('#messageLogin').show()
  })
  .always(() => {
    $('#inputEmail').val('')
    $('#inputPassword').val('')
  })
}

const register = () => {
  $.ajax({
    method: 'post',
    url: `${url}/register`,
    data: {
      email: $('#registEmail').val(),
      password: $('#registPassword').val()
    }
  })
  .done(data=> {
    $('.element').hide()
    $('#login').show()
    $('#inputEmail').val('')
    $('#inputPassword').val('')
  })
  .fail(err=>{
    $('#errRegist').text(err.responseJSON.message)
    $('#messageRegist').show()
  })
  .always(() => {
    $('#registEmail').val(''),
    $('#registPassword').val('')
  })
}

const showTodo = () => {
  $.ajax({
    url: `${url}/todos`,
    method: 'GET',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    todos = res
    $('#table-todo tbody').empty();
    for(let i = 0; i < todos.length; i++) {
      $('#table-todo tbody').append(`
      <tr>
      <td>${todos[i].title}</td>
      <td>${todos[i].description}</td>
      <td>${todos[i].status}</td>
      <td>${todos[i].due_date}</td>
      <td>
      <button onClick="edit(${todos[i].id})" class="btn btn-success btn-sm"  id="edit-btn">Edit</button>
      <button onClick="deleteTodo(${todos[i].id})" class="btn btn-danger btn-sm" id="delete-btn">Delete</button>
      </td>
      </tr>
      `);
    }
  })
  .fail(err => {
    console.log(err.responseJSON.message)
  })
}

const addTodo = () => {
  $.ajax({
    method: 'POST',
    url: `${url}/todos`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title: $('#add-title').val(),
      description: $('#add-description').val(),
      status: $('#add-status').val(),
      due_date: $('#add-due_date').val()
    }
  })
  .done(data => {
    $('.element').hide()
    $('#todo-list').show()
    showTodo()
  })
  .fail(err => {
    $('#errAddMsg').text(err.responseJSON.message)
    $('#msgAdd').show()
  })
  .always(() => {
    $('#add-title').val('')
    $('#add-description').val('')
    $('#add-status').val('')
    $('#add-due_date').val('')
  })
}

const edit = (id) => {
  $(".element").hide()
  $("#edit-todo").show()
  $("#editMsg").hide()

  for(let i = 0; i < todos.length; i++) {
    if(id == todos[i].id) {
      $("#edit-title").val(todos[i].title)
      $("#edit-description").val(todos[i].description)
      $("#edit-status").val(todos[i].status)
      $("#edit-due_date").val(todos[i].due_date)
      dataTodo = todos[i]
      break;
    }
  }
  
  $(".form-edit-todo").submit(event => {
    event.preventDefault()
    $.ajax({
      method: "PUT",
      url: `${url}/todos/${dataTodo.id}`,
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      data: {
        title: $("#edit-title").val(),
        description: $("#edit-description").val(),
        status: $("#edit-status").val(),
        due_date: $("#edit-due_date").val()
      }
    })
    .done(data => {
      $('.element').hide()
      $('#todo-list').show()
      showTodo()
    })
    .fail(err => {
      console.log(err.responseJSON.message)
      $('#errEditMsg').text(err.responseJSON.message)
      $('#editMsg').show()
    })
  })

}

const deleteTodo = (id) => {
  console.log(id)
  $.ajax({
    method: "DELETE",
    url: `${url}/todos/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(data => {
    $(".element").hide()
    $("#todo-list").show()
    showTodo()
  })
  .fail(err => {
    console.log(err.responseJSON.message)
  })
}

const showCalendar = () => {
  $.ajax({
    url: `${url}/calendar`,
    method: 'GET'
  })
  .done(res => {
    calendar = res.response.holidays
    $('#table-calendar tbody').empty();
    for(let i = 0; i < calendar.length; i++) {
      let year = calendar[i].date.datetime.year
      let month = calendar[i].date.datetime.month
      let day = calendar[i].date.datetime.day
      $('#table-calendar tbody').append(`
      <tr>
      <td>${i+1}</td>
      <td>${calendar[i].name}</td>
      <td>${calendar[i].description}</td>
      <td>${day}/${month}/${year}</td>
      </tr>
      `);
    }
  })
  .fail(err => {
    console.log(err.responseJSON.message)
  })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: `${url}/google-sign`,
    data: { id_token: id_token}
  })
  .done(data => {
    const access_token = data.access_token
    localStorage.setItem('access_token', access_token)
    $('.element').hide()
    $('#todo-list').show()
    $('#logout').show()
    showTodo()
  })
  .fail(err => {
    console.log(err.responseJSON.message)
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  .then(function () {
    console.log('User signed out.');
    return localStorage.removeItem('access_token')
  })
  .then(() => {
    event.preventDefault()
    $('.element').hide()
    $('#messageLogin').hide()
    $('#login').show()
  })
  .catch(err => {
    console.log(err)
  })
}