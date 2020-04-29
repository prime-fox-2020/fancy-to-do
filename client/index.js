$(document).ready(() => {
    // $("#shalom").css("color", "blue").show();
    // $(".elohai").hide();
    // $("#login").click(()=> {
    //     console.log("sudah login");
    //     $("#belum-login").text("Sudah login");
    //     $("#login").text("logout");
    // })Masih bingung flownya mbak. Kalau boleh diulang sekilas.

    // $("#signin-btn").click(()=> {
    //     $.ajax({
    //         type: "GET",
    //         url: "http://localhost:3000/todos",
    //         headers: {
    //             access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJjYWh5YW50YXJhQGdtYWlsLmNvbSIsImlhdCI6MTU4ODEzNzQzMn0.k5LdZYJ_NRvLxjuWBFv_aBDfSlfE48ldHSRveBWJo20"
    //         }
    //     })
    //     .done((todoList) => {
    //         for (const todo of todoList) {

    //         }
    //         console.log(res);
    //         alert( "success" );
    //     })
    //     .fail((res) => {
    //         alert( "error" );
    //     })
    //     .always((res) => {
    //         alert( "complete" );
    //     });
    // })
})

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/user/googleLogin",
        data: {token_id: id_token}
    })
    .done((response) => {
        // console.log(response)
        localStorage.setItem("access_token", response.accessToken)
        alert( "success" );
    })
    .fail((response) => {
        console.log(response)
        alert( "error" );
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('access_token');
}