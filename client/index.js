const baseUrl = 'http://localhost:3000'
let todos;
let todoId = 0

$(document).ready(()=>{
  $('section').hide()
  
  if(!localStorage.token){
    $('#login-page').show()
  } else {
    $('#logoutButton').show()
    $('#todo-page').show()
    fetchTodo()
  }

  $('#registerButton').click(e => {
    e.preventDefault()
    $('section').hide()
    $("#register-page").show()
  })

  $('#cancelButton').click(e => {
    e.preventDefault()
    $('section').hide()
    $("#login-page").show()
  })

  $('#addButton').click(e=>{
    e.preventDefault()
    $('section').hide()
    $("#add-page").show()
  })
  
  $('#cancelEditButton').click(e=>{
    e.preventDefault()
    $('section').hide()
    $('#todo-page').show()
  })

  $('#cancelAddButton').click(e=>{
    e.preventDefault()
    $('section').hide()
    $('#todo-page').show()
  })
  
  $(".form-register").submit(e => {
    e.preventDefault()
    const email = $("#registerEmail").val()
    const password = $("#registerPassword").val()
    register(email,password)
  })

  $('.form-login').submit(e=>{
    e.preventDefault()
    const email = $('#email').val()
    const password = $('#password').val()
    login(email,password)
  })
  
  $("#logoutButton").click(e => {
    e.preventDefault()
    localStorage.removeItem("token")
    $('section').hide()
    $('#login-page').show()
  })

})

function login (email, password){
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: {
      email,
      password
    }
  })
  .done(data=>{
    localStorage.setItem('token', data.token)
    $('section').hide()
    $('#todo-page').show()
    fetchTodo()
  })
  .fail(err=>{
    console.log(err, `error`)
  })
  .always(()=>{
    $('#email').val('')
    $('#password').val('')
  })
}

function register(email, password){
  $.ajax({
    url: `${baseUrl}/register`,
    type: "POST",
    data: {
      email,
      password
    }
  })
  .done(data => {
    localStorage.setItem('token', data.token)
    $('section').hide()
    $('#todo-page').show()
    fetchTodo()
  })
  .fail(err => {
    console.log(err)
  })
}

function fetchTodo (){
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers:{
      token: localStorage.getItem('token')
    }
  })
  .done(data=>{
    todos = data
    $('#todo-list').empty()
    if(todos.length > 0){
      todos.forEach(el=>{
        $('#todo-list').append(`
          <tr>
          <td>${el.title}</td>
          <td>${el.description}</td>
          <td>${el.status}</td>
          <td>${el.due_date}</td>
          <td>
            <button onClick="editTodo(${el.id})" class="btn btn-primary">edit</button>
            <button onClick="deleteTodo(event,${el.id})" class="btn btn-danger">delete</button>
          </td>
          </tr>
        `)
      })
    }
  })
  .fail(err=>{
    console.log(err)
  })
}

function addTodo (e){
  e.preventDefault()
  const todoTitle = $('#title').val()
  const todoDescription = $('#description').val()
  const todoStatus = $('#status').val()
  const todoDue_date = $('#due_date').val()
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    headers:{
      token: localStorage.getItem('token')
    },
    data: {
      title: todoTitle,
      description: todoDescription,
      status: todoStatus,
      due_date: todoDue_date
    }
  })
  .done(data=>{
    $('section').hide()
    $('#todo-page').show()
    fetchTodo()
  })
  .fail(err=>{
    console.log(err)
  })
  .always(()=>{
    $('#title').val('')
    $('#description').val('')
    $('#status').val('')
    $('#due_date').val('')
  })
}

function editTodo (id){
  $('section').hide()
  $('#edit-page').show()
  todoId = id
  for(let i = 0; i < todos.length; i++){
    if(todos[i].id == id){
      $("#editTitle").val(todos[i].title)
      $("#editDescription").val(todos[i].description)
      $("#editStatus").val(todos[i].status)
      $("#editDue_date").val(todos[i].due_date)
      break
    }
  }  
}

function putTodo (e){
    e.preventDefault()
    const editTitle = $('#editTitle').val()
    const editDescription = $('#editDescription').val()
    const editStatus = $('#editStatus').val()
    const editDue_date = $('#editDue_date').val()
    $.ajax({
      url:`${baseUrl}/todos/${todoId}`,
      type: "PUT",
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        title: editTitle,
        description: editDescription,
        status: editStatus,
        due_date: editDue_date
      }
    })
    .done(()=>{
      $('section').hide()
      $('#todo-page').show()
      fetchTodo()
    })
    .fail(err=>{
      console.log(err)
    })
    .always(()=>{
      $('#editTitle').val('')
      $('#editDescription').val('')
      $('#editStatus').val('')
      $('#editDue_date').val('')
    })
}

function deleteTodo (e, id){
  e.preventDefault
  $.ajax({
    url:`${baseUrl}/todos/${id}`,
    type: "DELETE",
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(()=>{
    $('section').hide()
    $('#todo-page').show()
    fetchTodo()
  })
  .fail(err=>{
    console.log(err)
  })
}