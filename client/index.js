const baseUrl = 'http://localhost:3000'
let todos;
let todoId = 0
let calendarData;

$(document).ready(()=>{
  $('section').hide()
  
  if(!localStorage.token){
    $('.errorMsg').empty()
    $('#login-page').show()
  } else {
    $('#logoutButton').show()
    $('#todo-page').show()
    fetchTodo()
  }

  $('#registerButton').click(e => {
    e.preventDefault()
    $('section').hide()
    $('.errorMsg').empty()
    $("#register-page").show()
  })

  $('#cancelButton').click(e => {
    e.preventDefault()
    $('section').hide()
    $('.errorMsg').empty()
    $("#login-page").show()
  })

  $('#addButton').click(e=>{
    e.preventDefault()
    $('section').hide()
    $('.errorMsg').empty()
    $("#add-page").show()
  })
  
  $('#cancelEditButton').click(e=>{
    e.preventDefault()
    $('section').hide()
    $('.errorMsg').empty()
    $('#todo-page').show()
  })

  $('#cancelAddButton').click(e=>{
    e.preventDefault()
    $('section').hide()
    $('.errorMsg').empty()
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
    signOut()
    localStorage.removeItem("token")
    $('section').hide()
    $('.errorMsg').empty()
    $('#login-page').show()
  })

  $("#calendarButton").click(e => {
    e.preventDefault()
    $('section').hide()
    $('#calendar-page').show()
    calendar()
  })

  $('#todoButton').click(e=>{
    e.preventDefault()
    $('section').hide()
    $('#todo-page').show()
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
    $('.errorMsg').empty()
    const msgErr = err.responseJSON.message
    $('.errorMsg').append(`<p class="alert alert-danger col-md-4">${msgErr}</p>`)
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
    $('section').hide()
    $('#login-page').show()
  })
  .fail(err => {
    $('.errorMsg').empty()
    const msgErr = err.responseJSON.message.split(', ')
    msgErr.forEach(list=>{
      $('.errorMsg').append(`<p class="alert alert-danger col-md-4">${list}</p>`)
    })
  })
  .always(()=>{
    $('#email').val('')
    $('#password').val('')
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
    console.log(err.responseJSON.message)
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
    $('.errorMsg').empty()
    const msgErr = err.responseJSON.message.split(', ')
    msgErr.forEach(list=>{
      $('.errorMsg').append(`<p class="alert alert-danger col-md-4">${list}</p>`)
    })
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
      $('.errorMsg').empty()
      const msgErr = err.responseJSON.message.split(', ')
      msgErr.forEach(list=>{
      $('.errorMsg').append(`<p class="alert alert-danger col-md-4">${list}</p>`)
      })
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

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/google-login`,
    data: { id_token: id_token}
  })
  .done(data => {
    localStorage.setItem('token', data.access_token)
    $('section').hide()
    $('#todo-page').show()
    fetchTodo()
  })
  .fail(err => {
    console.log(err)
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut()
  .then(function () {
    localStorage.removeItem("token")
  })
  .catch(err=>{
    console.log(err)
  })
}


const calendar = () => {
  $.ajax({
    url: `${baseUrl}/calendar`,
    method: 'GET'
  })
  .done(res => {
    $('#calendar-list').empty()
    res.forEach(list=>{
      $('#calendar-list').append(`
        <tr>
        <td>${list.name}</td>
        <td>${list.description}</td>
        <td>${list.date.substring(0,10)}</td>
        </tr>
      `)
    })
  })
  .fail(err => {
    console.log(err)
  })
}