$(document).ready(function() {
  $('.element').hide();
  check()

  $('#registerForm').submit((events) => {
    console.log("masuk register formmmm");
    events.preventDefault()

    const email = $('#iRE').val()
    const pass = $('#iRP').val()

    $.ajax({
      url: "http://localhost:3000/users/register",
      type: "PoSt",
      data: {email:email, password: pass}
    })
    .done( response => {
      successModal();
    })
    .fail( response => {
      modalError()
    })
  })

  $('#loginForm').submit((events) => {
    // console.log("masuk login formmmm");
    events.preventDefault()

    const email = $('#iLE').val()
    const pass = $('#iLP').val()

    $.ajax({
      url: "http://localhost:3000/users/login",
      type: "PoSt",
      data: {email:email, password: pass}
    })
    .done( response => {
      successModal();
      localStorage.setItem('access_token', response.accessToken);
      check();
    })
    .fail( response => {
      modalError()
    })
  })

  $('#todos').submit((events) => {
    events.preventDefault();
    const title = $('#input-Title').val();
    const description = $('#input-Description').val();
    const status = $('#input-Status').val();
    const due_date = $('#input-Due_date').val();
    // console.log(title);

    $.ajax({
      url: "http://localhost:3000/todos",
      type:"POST",
      data: {
        title: title,
        description:description,
        status: status,
        due_date: due_date
      },
      headers: {access_token : localStorage.getItem('access_token')}
    })
    .done( response => {
      console.log(response);
      $('#input-Title').val('');
      $('#input-Description').val('');
      $('#input-Status').val('');
      $('#input-Due_date').val('');
      getTodos();
    })
    .fail(response => {
      modalError()
    })
  })

  $('#editTodo').submit((events) => {
    console.log('masuk edit form');
    events.preventDefault()
    const title = $('#edit-Title').val()
    const description = $('#edit-Description').val()
    const status = $('#edit-Status').val()
    const due_date = $('#edit-Due_date').val()
    console.log(title, description, status, due_date);
    $.ajax({
      url: `http://localhost:3000/todos/${foundId}`,
      type:"PUT",
      data: {
        title: title,
        description:description,
        status: status,
        due_date: due_date
      },
      headers: {access_token : localStorage.getItem('access_token')}
  })
  .done( response => {
    check()
  })
  .fail(response => {
    modalError()
  })
})

})

//out jquery function

function register() {
  $('#register').show()
  $('#login').hide();
  $('#googleSignIn').hide();
}

function login() {
  $('#register').hide()
  $('#login').show();
  $('#googleSignIn').show();
}

function deleteTodo() {
  let id = localStorage.getItem('id')
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    type:"DELETE",
    headers: {access_token : localStorage.getItem('access_token')}
  })
  .done( response => {
    successModal();
    check();
  })
  .fail(response => {
    modalError();
  })
}

function getTodoById(id) {
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    type:"GET",
    headers: {access_token : localStorage.getItem('access_token')}
  })
  .done( response => {
    const data = response;
    successModal();
    $('#editTodo').empty()
    const temp = `
      <label for="">Title</label>
        <input type="text" id="edit-Title" value='${data.title}'> <br>
      <label for="">Description</label>
        <input type="text" id="edit-Description" value='${data.description}'> <br>
      <label for="">Status</label>
        <input type="text" id="edit-Status" value='${data.status}'> <br>
      <label for="">Due date</label>
        <input type="date" id="edit-Due_date" value='${data.due_date}'> <br>
      <button id="saveBtn" type="submit" >Save</button>  <a id="cancelBtn" onclick="check()" href="#">Cancel</a>
    `
    $('#editTodo').append(temp)
    console.log($(data.title));
    $('.element').hide()
    $('#edit').show()
    getId(id)
  })
  .fail(response => {
    modalError()
  })
}

let foundId;Error
function getId(id) {
  return foundId = id;
}

function getTodos() {
  $.ajax({
    url: "http://localhost:3000/todos",
    type: "GET",
    headers: {access_token : localStorage.getItem('access_token')}
  })
  .done(function(response ) {
    const data = response;
    $('#todos tbody').empty();
    for (let i = 0; i < data.length; i++) {
      const temp = `
        <tr>
          <td>${data[i].title}</td>
          <td>${data[i].description}</td>
          <td>${data[i].status}</td>
          <td>${data[i].due_date}</td>
          <td><a href="#" onclick=getTodoById(${data[i].id})>Edit</a> ||| <a href="#" onclick=modalDelete(${data[i].id})>Delete<a> ||| <a href="#" onclick=reminder(${data[i].id})>Reminder</a> </td>
        </tr>
      `
      $('#todos tbody').append(temp);
    }
  })
  .fail(function(response) {
    modalError()
  })
  // .always(function(response) {
  //   console.log('ini dari getTodos');
  // })
}


function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: "http://localhost:3000/users/googlelogin",
    type: "POST",
    data: {token_id: id_token}
  })
  .done(function(response ) {
    successModal()
    localStorage.setItem('access_token', response.accessToken);
    check();
  })
  .fail(function(response) {
    modalError()
  })

  // var auth2 = gapi.auth2.getAuthInstance();
  // auth2.disconnect();
}


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem('access_token')
  check();
}

function check() {
  if (localStorage.getItem('access_token')) {
    $('.element').hide();
    $('#todos').show();
    $('#logout').show();
    successModal();
    getTodos();
  }
  else {
    $('.element').hide();
    $('#login').show();
    $('#googleSignIn').show();
  }
}

function reminder(id) {
  $.ajax({
    url: `http://localhost:3000/todos/dailymail/${id}`,
    type: "POST",
    headers: {access_token : localStorage.getItem('access_token')}
  })
  .done(function(response ) {
    successModal()
  })
  .fail(function(response) {
    modalError()
  })
}

function modalDelete(deleteID) {
  localStorage.setItem('id', deleteID);

  $('#modalDelete').show()
}

function modalError() {
  $('#modalError').show()
}

function closeModal() {
  $('#modalDelete').hide()
  $('#modalError').hide()
  $('#modalSucces').hide()
}

function successModal() {
  $('#modalSucces').show()
}
