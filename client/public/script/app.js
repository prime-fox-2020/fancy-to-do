
start()

function start(){
  const login = localStorage.getItem('access_token')

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/todos/',
    headers:{
      access_token: login
    }
  })
  .done(result => {
    const todos = getTodos(result)
    $('.todos').html(todos)
  })
  .fail(err => console.log(err))
  .always(() => console.log('hei come visit wix.com'))
  
  if(!login){
    $('#login').show()
    $('#register').hide()
    $('#todo').hide()
  }else{
    $('#login').hide()
    $('#todo').show()
  }
}

function getTodos(data){
  let todos = ''
  for(let todo of data){
    todos += `
    <li class="todo"> <h4>${todo.title}</h4>
      <button class="delete btn btn-info" data-toggle="modal" data-target="#delete${todo.id}">Delete</button>
      <button class="edit btn btn-info" data-toggle="modal" data-target="#edit${todo.id}">Edit</button>
      <ul>
        <li>
          <p> status: ${todo.status}</p>
        </li>
        <li>
          <p class="lead"> description: ${todo.description}</p>
        </li>
      </ul>
      <hr>
    </li>
    `
  }
  return todos
}

$('#logout').click(function(){
  localStorage.removeItem('access_token')
  $('#login-email').val("")
  $('#login-password').val("")
  start()
})

//logic login
$('#login-btn').on('click', function(e){

  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/users/login',
    data:{
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
  .done(result => {
    localStorage.setItem('access_token', result.access_token)
    start()
  })
  .fail(err => {
    $('#login-email').val("")
    $('#login-password').val("")
  })
  .always(() => console.log('hei come visit wix.com'))
  
})

//login register swithcer
$('.login-btn').click(function(e){
  e.preventDefault()
  $('#login').show()
  $('#register').hide()
})

$('.register-btn').click(function(e){
  e.preventDefault()
  $('#login').hide()
  $('#register').show()
})

//register logic
$('#register-btn').on('click', function(e){
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/users/register',
    data:{
      email: $('#register-email').val(),
      password: $('#register-password').val(),
      location: $('#register-location').val()
    }
  })
  .done(result => {
    console.log('success')
  })
  .fail(err => {
    $('#login-email').val("")
    $('#login-password').val("")
    $('#register-location').val("")
  })
  .always(() => console.log('hei come visit wix.com'))
})

$('.login-modal').click(function(e){
  start()
})


$('#todo-form').submit(function(e){
  const login = localStorage.getItem('access_token')

  e.preventDefault()
  const title       = $('#todo-title').val()
  const description = $('#todo-description').val()
  const status      = $('#todo-status').val()
  $('#todo-title').val("")
  $('#todo-description').val("")
  $('#todo-status').val("Choose...")

  console.log(status)
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/todos',
    headers:{
      access_token: login
    },
    data:{
      title: title,
      description: description,
      status : status
    }
  })
  .done(result => {
    start()
  })
  .fail(err => {
    console.log(err)
  })
  .always(() => console.log('hei come visit wix.com'))
})

$('ul').on('click', '.edit', function(e){
  const login = localStorage.getItem('access_token')
  const li    = $(this).parent()
  const newId = $(this).attr('data-target').slice(1)
  const id    = newId.slice(4)
  $('.modalEdit').attr('id', newId)
  $.ajax({
    type: 'GET',
    url: `http://localhost:3000/todos/${id}`,
    headers:{
      access_token : login
    }
  })
  .done(result => {
    $('#edit-title').val(result.title)
    $('#edit-description').val(result.description)
    $('#edit-status').val(result.status)

    $('.sure-edit').click(function(e){
      let title       = $('#edit-title').val()
      let description = $('#edit-description').val()
      let status      = $('#edit-status').val()
      
      $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        headers:{
          access_token: login
        },
        data:{
          title: title,
          description: description,
          status : status
        }
      })
      .done(result => {
        start()
      })
      .fail(err => console.log(err))
    })
  })
  .fail(err => console.log(err))
})

$('ul').on('click', '.delete', function(e){
  const login = localStorage.getItem('access_token')
  const li    = $(this).parent()
  const newId = $(this).attr('data-target').slice(1)
  const id    = newId.slice(6)
  $('.modalDelete').attr('id', newId)
  $('.sure-delete').click(function(e){
    li.fadeOut(500,function(){
      $.ajax({
        type:'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers:{
          access_token: login
        }
      })
      .done(result => start())
      .fail(err => console.log(err))
    })
  })
})