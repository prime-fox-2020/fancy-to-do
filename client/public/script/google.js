function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    type:'POST',
    url:'http://localhost:3000/users/google-login',
    data: {
      id_token: id_token
    }
  })
  .done(result => {
    console.log(result)
    localStorage.setItem('access_token', result.access_token)
    start()
  })
  .fail(err => {
    console.log(err)
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}