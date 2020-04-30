$( "#id_login" ).submit(function( event ) {
    
    event.preventDefault();
    var email = $("#emailLogin").val()
    var password = $("#passwordLogin").val()
    // console.log(email)
    // console.log(password)
    $.ajax({
        type:"POST",
        crossDomain : true,
        url : "htpp://localhost:3000/users/login",
        data : {email : email, password : password}
    })
    .done(function (response) {
        console.log(response)
    })
    .fail(err => {
        console.log(err)
    })
    
});

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
}


function onSignIn(googleUser) {
    //kirim id token ke backend
    //respon access-token akan disimpan ke local storage
    console.log(onSignIn)
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/google-sign",
        data: { id_token : id_token }
    })
        .done(function( msg ) {
           localStorage.setItem("access_token", data.access_token)
        })
}