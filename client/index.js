// import { response } from "express"


$(document).ready(function(){
  $('.elements').hide()
  
  check()

  $('#register-form').submit((event)=>{
    console.log('ini masuk register')
    event.preventDefault()

    const email_register = $('#input-register-email').val()
    const pass_register = $('#input-register-password').val()

    console.log(email_register)
    console.log(pass_register)

    $.ajax({
        url: "http://localhost:3000/register",
        type: 'POST',
        data: {email: email_register,
           pass: pass_register
          }
      })
      .done((response)=>{
        console.log(response, 'successfully registered')
        check()
      })
      .fail((response)=>{
        console.log(response, 'failed register')
        openErrorModal()
      })
      .always((response)=>{
        console.log(response, 'dari register')
      })
      
  })

  $('#login-form').submit((event)=>{
    console.log('ini masuk login')
    event.preventDefault()

    const email_login = $('#input-login-email').val()
    const pass_login = $('#input-login-password').val()

    console.log(email_login)
    console.log(pass_login)

    $.ajax({
        url: "http://localhost:3000/login",
        type: 'POST',
        data: {
          email: email_login,
          pass: pass_login
        }
      })
      .done((response)=>{
        console.log(response, 'udah login')
        localStorage.setItem('access_token', response.access_token)
        check()
        getTodos()
      })
      .fail((response)=>{
        console.log(response, 'error login')
        openErrorModal()
      })
      .always((response)=>{
        console.log(response, 'dari login')
      })
  })



  // $.ajax({
  //   url: "http://localhost:3000/login",
  //   type: 'POST',
  //   data: {token: id_token}
  // })
  // .done(function(response) {
  //   console.log(response)
  //   localStorage.setItem('access_token', response.access_token)
  // })
  // .fail(function(response){
  //   console.log(response)
  // })
})

getTodos = () =>{
  const token = localStorage.getItem('access_token')
  $.ajax({
      url: "http://localhost:3000/todos",
      type: 'GET',
      headers: {
        access_token: token
      }
    })
    .done((response)=>{
      console.log('ini di getTodos')
      let todos = response.data
      console.log(response.data[0], 'ini response getTodos')

      $('#todos tbody').empty()

      for(let a = 0; a < todos.length; a++){
        let new_row = `
        <tr>
        <td>${a+1}</td>
        <td>${todos[a].title}</td>
        <td>${todos[a].desc}</td>
        <td>${todos[a].status}</td>
        <td>${todos[a].due_date}</td>
        <td><a href="#" role="button" onclick="editTodo(${todos[a].id})">Edit</a>
        ~ <a href="#" role="button" onclick="openDeleteModal(${todos[a].id})">Delete</a>
        ~ <a href="#" role="button" onclick="reminder(${todos[a].id})">Reminder</a></td>
        </tr>
        `
        $('#todos tbody').append(new_row)
      }
    })
    .fail((response)=>{
      console.log('failed getTodos')
      openErrorModal()
    })
    .always((response)=>{
      console.log('dari getTodos')
    })
}

$('#addTodos').submit((event)=>{
  console.log('masuk addTodos')
  event.preventDefault()
  const token = localStorage.getItem('access_token')
  const title = $('#input-todo-title').val()
  const desc = $('#input-todo-desc').val()
  const due = $('#input-todo-due').val()
  $.ajax({
      url: "http://localhost:3000/todos",
      type: 'POST',
      headers: {
        access_token: token
      },
      data: {
        title: title,
        desc: desc,
        due_date: due
      }
    })
    .done((response)=>{
      console.log('success addTodos')
      $('#input-todo-title').val('')
      $('#input-todo-desc').val('')
      $('#input-todo-due').val('')
      check()
    })
    .fail((response)=>{
      console.log('failed addTodos')
      openErrorModal()
    })
    .always((response)=>{
      console.log('dari addTodos')
    })
})

editTodo = (id) =>{
  const token = localStorage.getItem('access_token')
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    type: 'GET',
    headers: {
      access_token: token
    }
  })
  .done((response)=>{
    console.log('success getTodosId')
    $('#editTodos').show()
    $('#addTodos').hide()
    $('#cancel-edit').show()
    localStorage.setItem('edit_id', id)
    $('#input-todo-edit-title').val(response.data.title)
    $('#input-todo-edit-desc').val(response.data.desc)
    $('#input-todo-edit-due').val(response.data.due_date)
  })
  .fail((response)=>{
    console.log('failed getTodosId')
    openErrorModal()
  })
  .always((response)=>{
    console.log('dari getTodosId')
  })
}

cancelEdit = () =>{
  localStorage.removeItem('edit_id')
  $('#editTodos').hide()
  $('#addTodos').show()
  $('#cancel-edit').hide()
}

$('#editTodos').submit((event)=>{
  console.log('masuk editTodos')
  event.preventDefault()

  const id = localStorage.getItem('edit_id')
  const token = localStorage.getItem('access_token')
  const title = $('#input-todo-edit-title').val()
  const desc = $('#input-todo-edit-desc').val()
  const status = $('#input-todo-edit-status').val()
  const due = $('#input-todo-edit-due').val()
  console.log(id,title,desc,status,due)
  $.ajax({
      url: `http://localhost:3000/todos/${id}`,
      type: 'PUT',
      headers: {
        access_token: token
      },
      data: {
        title: title,
        desc: desc,
        status: status,
        due_date: due
      }
    })
    .done((response)=>{
      console.log('success editTodos')
      $('#input-todo-edit-title').val('')
      $('#input-todo-edit-desc').val('')
      $('#input-todo-edit-status').val('')
      $('#input-todo-edit-due').val('')
      localStorage.removeItem('edit_id')
      check()
    })
    .fail((response)=>{
      console.log('failed editTodos')
      openErrorModal()
    })
    .always((response)=>{
      console.log('dari editTodos')
    })
})

deleteTodo = () =>{
  const id = localStorage.getItem('deleteId')
  const token = localStorage.getItem('access_token')
  $.ajax({
    url: `http://localhost:3000/todos/${id}`,
    type: 'DELETE',
    headers: {
      access_token: token
    }
  })
  .done((response)=>{
    console.log('success deleteTodo')
    localStorage.removeItem('deleteId')
    check()
  })
  .fail((response)=>{
    console.log('failed deleteTodo')
    openErrorModal()
  })
  .always((response)=>{
    console.log('dari deleteTodo')
  })

}

reminder = (id) =>{
  const token = localStorage.getItem('access_token')
  $.ajax({
    url: `http://localhost:3000/todos/${id}/reminder`,
    type: 'POST',
    headers: {
      access_token: token
    }
  })
  .done((response)=>{
    console.log('success reminder')
    check()
    openReminderModel()
  })
  .fail((response)=>{
    console.log('failed reminder')
    openErrorModal()
  })
  .always((response)=>{
    console.log('dari reminder')
  })
}

openReminderModel = () =>{
  $('#reminderPopUp').css('display', 'block')
}

closeReminderModel = () =>{
  $('#reminderPopUp').css('display', 'none')
}

check = () =>{
  if(localStorage.getItem('access_token')){
    $('.elements').hide()
    $('#todos').show()
    $('#googleSignOut').show()
    $('#addTodos').show()
    $('#signOutButton').show()
    getTodos()
  } else {
    $('.elements').hide()
    $('#OpenModal').show()
    $('#showRegister').show()
    $('#login').show()
    $('#googleSignIn').show()
  }
}

showRegister = () =>{
  $('#showLogin').show()
  $('#showRegister').hide()
  $('#register').show()
  $('#login').hide()
}

showLogin = () =>{
  $('#showRegister').show()
  $('#showLogin').hide()
  $('#register').hide()
  $('#login').show()
}

openDeleteModal = (id) =>{
  localStorage.setItem('deleteId', id)
  $('#deletePopUp').css('display', 'block')
}

closeDeleteModal = () =>{
  localStorage.removeItem('deleteId')
  $('#deletePopUp').css('display', 'none')
}

openErrorModal = () =>{
  $('#errorPopUp').css('display', 'block')
}

closeErrorModal = () =>{
  $('#errorPopUp').css('display', 'none')
}



function onSignIn(googleUser) {
    
    var id_token = googleUser.getAuthResponse().id_token;
    var auth2 = gapi.auth2.getAuthInstance();
    console.log(id_token)

    $.ajax({
        url: "http://localhost:3000/googleSignIn",
        type: 'POST',
        data: {token: id_token}
      })
      .done(function(response) {
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        auth2.disconnect();
        check()
      })
      .fail(function(response){
        console.log(response)
        openErrorModal()
      })
}

function signOut() {
  console.log('logout nya google')
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem('access_token')
  check()
}
