$(document).ready(function() {
  $('#registerForm').hide()
  $('#loginError').hide()
  $('#registerError').hide()
  $('.collapsible').collapsible()
  $('.modal').modal()
  $('.datepicker').datepicker()

  if (localStorage.access_token) {
    $('#logoutButton').show()
    $('#dashboardSection').show()
    $('#loginForm').hide()
    getTodos()
  } else {
    $('#loginForm').show()
    $('#logoutButton').hide()
  }

  $('#userLoginForm' ).on('submit', function( event ) {
    event.preventDefault()
    const email = $('#userEmailLogin').val()
    const password = $('#userPasswordLogin').val()
    userLogin(email, password)
  })
  
  $('#userRegisterForm' ).on('submit', function( event ) {
    event.preventDefault()
    const user = {}
    user.first_name = $('#first_name').val()
    user.last_name = $('#last_name').val()
    user.email = $('#userEmailRegister').val()
    user.password = $('#userPasswordRegister').val()
    userRegister(user)
  })
  
  $('#buttonLoginForm' ).on('click', function( event ) {
    event.preventDefault()
    $('#loginForm').show()
    $('#registerForm').hide()
  });
  
  $('#buttonRegisterForm' ).on('click', function( event ) {
    event.preventDefault()
    $('#loginForm').hide()
    $('#registerForm').show()
  })
  
  $('#logoutButton' ).on('click', function( event ) {
    event.preventDefault()
    userLogout()
    M.toast({html: 'See ya!'})
  })

  $('#todosParent').on('click', '.todo-delete', function (event) {
    event.preventDefault()
    const todo = $(this).parent()
    
    deleteTodo(todo)
  })
})

function userLogout() {
  localStorage.removeItem('access_token')
  signOut()
  $('#loginForm').show()
  $('#logoutButton').hide()
  $('#loginError').hide()
  $('#dashboardSection').hide()
  clearTodos()
}

function userLogin(email, password) {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/login',
    data: {
      email,
      password
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    $('#loginError').hide()
    $('#loginForm').hide()
    $('#logoutButton').show()
    $('#dashboardSection').show()
    getTodos()
    M.toast({html: 'Hey! Good to see you again!'})
  })
  .fail(err => {
    $('#loginErrorText').text('')
    $('#loginErrorText').text(err.responseJSON.message)
    $('#loginError').show()
  })
}

function userRegister({first_name, last_name, email, password}) {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/register',
    data: {
      first_name,
      last_name,
      email,
      password
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    $('#registerError').hide()
    $('#registerForm').hide()
    $('#logoutButton').show()
    $('#dashboardSection').show()
    getTodos()
    M.toast({html: `Hello ${first_name}, Nice to meet you!`})
  })
  .fail(err => {
    $('#registerErrorText').text('')
    $('#registerErrorText').text(err.responseJSON.message)
    $('#registerError').show()
  })
}

function clearTodos() {
  $('#todosParent').children('.card-image').remove()
}

function getTodos() {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/todos',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(response => {
    console.log({response})
    if (response.length) {
      response.forEach(item => {
        const list = `
        <li data-id="${item.id}" class="card-image">
          <a class="btn-floating halfway-fab waves-effect waves-light todo-header"><i class="material-icons" style="color: black; font-size: 2.5rem;">${item.status === 'completed' ? 'check_box' : 'check_box_outline_blank'}</i></a>
          <a class="btn-floating halfway-fab waves-effect waves-light todo-edit" teal><i class="material-icons">edit</i></a>
          <a class="btn-floating halfway-fab waves-effect waves-light todo-delete red"><i class="material-icons">delete</i></a>
          <div class="collapsible-header${item.status === 'completed' ? ' todo-completed' : ''}"  style="padding-left: 5rem;"><h5>${item.title}</h5></div>
          <div class="collapsible-body white${item.status === 'completed' ? ' todo-completed' : ''}"><span>${item.description}</span></div>
        </li>
        `
        $('#todosParent').append(list)
      })
      $('.no-todo-found').hide()
    } else {
      $('.no-todo-found').show()
    }
  })
  .fail(err => {
    console.log({err})
  })
}

function deleteTodo(todo) {
  const id = todo.attr('data-id')

  $.ajax({
    method: 'DELETE',
    url: 'http://localhost:3000/todos/' + id,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    if(response.todo) {
      todo.remove()
      M.toast({html: response.message})
    }
  })
  .fail(err => {
    console.log(err)
  })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  googleLogin(id_token)
}

function googleLogin(id_token) {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/login/googleLogin',
    data: {
      id_token
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    $('#loginError').hide()
    $('#loginForm').hide()
    $('#logoutButton').show()
    $('#dashboardSection').show()
    getTodos()
    M.toast({html: 'Hey! Welcome!'})
  })
  .fail(err => {
    $('#loginErrorText').text('')
    $('#loginErrorText').text(err.responseJSON.message)
    $('#loginError').show()
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out.')
  })
}