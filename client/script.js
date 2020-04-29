$(document).ready(function() {
  $('#registerForm').hide()
  $('#loginError').hide()
  $('#registerError').hide()

  if (localStorage.access_token) {
    $('#logoutButton').show()
    $('#loginForm').hide()
    
  } else {
    $('#loginForm').show()
    $('#logoutButton').hide()
  }
})

  // $( "#userLoginForm" ).submit( function( event ) {
  //   console.log('formmmmmmmm')
  //   event.preventDefault();
  // });
    // $('#userLoginForm').on("submit",function (event) {
    //     console.log('formmmmmmmm')
    //   event.preventDefault()
    //   const email = $('#userEmail').val()
    //   const password = $('#userPassword').val()
    //   console.log(email, password)
    //   userLogin(email, password)
    // });

$( "#buttonLogin" ).on( "click", function( event ) {
  event.preventDefault();
  const email = $('#userEmailLogin').val()
  const password = $('#userPasswordLogin').val()
  userLogin(email, password)
});

$( "#buttonRegister" ).on( "click", function( event ) {
  event.preventDefault();
  const user = {}
  user.first_name = $('#first_name').val()
  user.last_name = $('#last_name').val()
  user.email = $('#userEmailRegister').val()
  user.password = $('#userPasswordRegister').val()
  userRegister(user)
});

$( "#buttonLoginForm" ).on( "click", function( event ) {
  event.preventDefault();
  
  $('#loginForm').show()
  $('#registerForm').hide()
});

$( "#buttonRegisterForm" ).on( "click", function( event ) {
  event.preventDefault();
  
  $('#loginForm').hide()
  $('#registerForm').show()
});

$( "#logoutButton" ).on( "click", function( event ) {
  event.preventDefault();
  localStorage.removeItem('access_token')
  
  $('#loginForm').show()
  $('#logoutButton').hide()
  $('#loginError').hide()
});

function userLogin(email, password) {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/login',
    data: {
      email,
      password
    }
  })
  .done(respond => {
    localStorage.setItem('access_token', respond.access_token)
    $('#loginError').hide()
    $('#loginForm').hide()
    $('#logoutButton').show()
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
  .done(respond => {
    localStorage.setItem('access_token', respond.access_token)
    $('#registerError').hide()
    $('#registerForm').hide()
    $('#logoutButton').show()
  })
  .fail(err => {
    $('#registerErrorText').text('')
    $('#registerErrorText').text(err.responseJSON.message)
    $('#registerError').show()
  })
}