const url = 'http://localhost:3000'
let todos = []
let calendar =[]
let dataTodo;

$(document).ready(() => {
  checkToken()
  $("#goto-register-btn").click(event => {
    event.preventDefault()
    $(".element").hide()
    $("#register").show()
    $('#messageRegist').hide()
  })

  $("#cancel-register-btn").click(event => {
    event.preventDefault()
    checkToken()
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
    checkToken()
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

// login function
const login = () => {
  $.ajax({
    method: 'POST',
    url: `${url}/login`,
    data: {
      email: $('#inputEmail').val(),
      password: $('#inputPassword').val()
    }
  })
  .done(data=> {
    const access_token = data.access_token
    localStorage.setItem('access_token', access_token)
    Swal.fire({
      icon: 'success',
      title: 'Congratulation',
      text: 'Success Login'
    })
    $('.element').hide()
    $('#todo-list').show()
    $('.hide-button').show()
    showTodo()
  })
  .fail(err=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.responseJSON.message
    })
    // $('#errLogin').text(err.responseJSON.message)
    // $('#messageLogin').show()
  })
  .always(() => {
    $('#inputEmail').val('')
    $('#inputPassword').val('')
  })
}

// register function
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
    Swal.fire({
      icon: 'success',
      title: 'Congratulation',
      text: 'Register Success'
    })
    $('.element').hide()
    $('#login').show()
    $('#inputEmail').val('')
    $('#inputPassword').val('')
  })
  .fail(err=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.responseJSON.message
    })
    // $('#errRegist').text(err.responseJSON.message)
    // $('#messageRegist').show()
  })
  .always(() => {
    $('#registEmail').val(''),
    $('#registPassword').val('')
  })
}

// get all todo
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
      <button onClick="edit(${todos[i].id})" class="btn btn-success btn-sm shadow" id="edit-btn">Edit</button>
      <button onClick="warning  (${todos[i].id})" class="btn btn-danger btn-sm shadow" id="delete-btn">Delete</button>
      </td>
      </tr>
      `);
    }
  })
  .fail(err => {
    console.log(err.responseJSON.message)
  })
}

// create todo
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
    Swal.fire({
      title: 'Success',
      text: `Successfully added ${data.title} into todo list`
    })
    $('.element').hide()
    $('#todo-list').show()
    showTodo()
  })
  .fail(err => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.responseJSON.message
    })
      // $('#errAddMsg').text(err.responseJSON.message)
      // $('#msgAdd').show()
    })
  .always(() => {
    $('#add-title').val('')
    $('#add-description').val('')
    $('#add-status').val('')
    $('#add-due_date').val('')
  })
}

// update todo
const edit = (id) => {
  $(".element").hide()
  $("#edit-todo").show()
  $("#editMsg").hide()
  
  $.ajax({
    method: "GET",
    url: `${url}/todos/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(todo => {
    $("#edit-title").val(todo.title)
    $("#edit-description").val(todo.description)
    $("#edit-status").val(todo.status)
    $("#edit-due_date").val(todo.due_date)
    dataTodo = todo
  })
  .fail(err => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.responseJSON.message
    })
    // $('#errEditMsg').text(err.responseJSON.message)
    // $('#editMsg').show()
  })

  $(".form-edit-todo").submit(event => {
    event.preventDefault()
    let todoTitle =$("#edit-title").val()
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
      Swal.fire({
        title: 'Success',
        text: `Successfully edited ${todoTitle}`
      })
      $('.element').hide()
      $('#todo-list').show()
      showTodo()
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.responseJSON.message
      })
      // $('#errEditMsg').text(err.responseJSON.message)
      // $('#editMsg').show()
    })
  })

}

const warning = (id) => {
  Swal.fire({
    text: "Are you sure you want to delete this todo?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#76db00',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete Todo'
  })
  .then((res) => {
    if (res.value) {
        deleteTodo(id)
    }
  })
  .catch(err => {
    console.log(err)
  })
}

// delete todo
const deleteTodo = (id) => {
  $.ajax({
    method: "DELETE",
    url: `${url}/todos/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(data => {
    Swal.fire({
      title: 'Deleted',
      text: `Successfully delete`
    })
    $(".element").hide()
    $("#todo-list").show()
    showTodo()
  })
  .fail(err => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.responseJSON.message
    })
    // console.log(err.responseJSON.message)
  })

}

// show 3rd Party API
const showCalendar = () => {
  $.ajax({
    url: `${url}/calendar`,
    method: 'GET',
    headers: {
      access_token: localStorage.access_token
    }
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

// check user access_token
const checkToken = () => {
  if(localStorage.getItem("access_token")) {
    $(".element").hide()
    $('#todo-list').show()
    $('.hide-button').show()
    showTodo()
  } else {
    $(".element").hide()
    $('#login').show()
    $('#messageLogin').hide()
    $(".hide-button").hide()
  }
}

// google sign in function
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
    Swal.fire({
      icon: 'success',
      title: 'Congratulation',
      text: 'Success Login'
    })
    checkToken()
  })
  .fail(err => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.responseJSON.message
    })
    // console.log(err.responseJSON.message)
  })
}

// google sign out function
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  .then(function () {
    console.log('User signed out.');
    // localStorage.removeItem('access_token')
    // checkToken()
  })

  .catch(err => {
    console.log(err)
  })
}