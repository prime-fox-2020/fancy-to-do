// import { json } from "express";
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/google-signIn",
        data: { id_token }
    })
        .done(function (msg) {
            console.log(msg.access_token);
            console.log('User singed in.');
            localStorage.setItem('access_token', msg.access_token);
        });
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('access_token');
        console.log('User signed out.');
    });
}


$(document).ready(function () {
    let isLogin = false;
    const access_token = localStorage.getItem('access_token');
    $("#home").hide()
    $("#form_register").hide()


    $("#login" || "#logout" || "#login_google").click(function (e) {
        e.preventDefault();
        const email = $("#email").val();
        const password = $("#password").val();

        if (isLogin) {
            localStorage.removeItem('access_token');
            $("#home").hide();
            $("#form").show();
            isLogin = false;
        } else {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/users/login',
                dataType: 'json',
                data: { email, password }
            })
                .done(function (msg) {
                    console.log(msg.access_token)
                    localStorage.setItem('access_token', msg.access_token);
                    $("#form").hide();
                    $("#home").show();
                    isLogin = true;
                })
        }
    })

    $("#register").click(function (e) {
        e.preventDefault();
        $("#form_login").hide()
        $("#form_register").show()
    })

    $("#submit_register").click(function (e) {
        e.preventDefault();

        let result = {
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            email: $("#email_form").val(),
            password: $("#password_form").val()
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/users/register',
            dataType: 'json',
            data: result
        })
            .done(function () {
                console.log('SUCCESS')
                $("#form_register").hide()
                $("#form_login").show()
            })
            .fail(function (err) {
                console.log(err)
                console.log('ERRR')
            })
            .always(function () {
                console.log('ALWAYS')
            })
    })

    $("#input_data").click(function (e) {
        e.preventDefault();
        let input = $("#input_todo").val();

        if (input !== '') {
            $(".list-group").append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${input}
                <span class="badge badge-primary badge-pill"><i class="fa fa-check"></i></span>
            </li>`);
            $("#input_todo").val("");
        }
    })

    $("#show_data").click(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/todos',
            data: { access_token }
        })
            .done(function (msg) {
                msg.forEach(todo => {
                    $("#list_todo").append(`
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            ${todo.title}
                            <span class="badge badge-primary badge-pill">
                                <i class="fa fa-check"></i>
                            </span>
                        </li>
                    `);
                });
            })
            .fail(function (err) {
                console.log(err)
                console.log('ERRR')
            })
            .always(function () {
                console.log('ALWAYS')
            })
    })

    // $('input').keypress(function (event) {
    //     if (event.which === 13) {
    //         var todoText = $(this).val();
    //         $(this).val("");
    //         $('ul').append('<li>' + todoText + '<span><i class="fa fa-trash"</i></span>');
    //     }
    // });
    // $('ul').on('click', "span", function (event) {
    //     $(this).parent().fadeOut(500, function () {
    //         $(this).remove();
    //     });
    //     event.stopPropagation();
    // });
    // $('ul').on('click', 'li', function () {
    //     $(this).toggleClass('done');
    // });

    function getDatas() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/todos',
            data: { access_token },
            success: function (msg) {
                msg.forEach(todo => {
                    let task = $("<div class='task'></div>").text(`${todo.title}`);
                    let del = $("<i class='fa fa-trash'></i>").click(function () {
                        let p = $(this).parent();

                        $.ajax({
                            type: 'DELETE',
                            url: `http://localhost:3000/todos/${todo.id}`,
                            data: { access_token: access_token }
                        })
                            .done(function (msg) {
                                p.fadeOut(function () {
                                    p.remove();
                                });
                            })
                    });

                    let check = $("<i class='fa fa-check'></i>").click(function () {
                        let p = $(this).parent();
                        // $.ajax({
                        //     type: 'PUT',
                            
                        // })

                        p.fadeOut(function () {
                            $(".comp").append(p);
                            p.fadeIn();
                        });
                        $(this).remove();
                    });

                    let edit = $("<i id='edit' class='fa fa-edit'></i>").click(function () {
                        // console.log($(this).parent())
                    })

                    task.append(edit, del, check);
                    $(".notcomp").append(task);
                });

            }
        })

    }

    // function deleteData(id, p) {
    //     $.ajax({
    //         type: 'DELETE',
    //         url: `http://localhost:3000/todos/${id}`,
    //         data: { access_token },
    //         success: function (msg) {
    //             console.log('DELETED')
    //             console.log(msg)
    //             p.fadeOut(function () {
    //                 p.remove();
    //             });
    //         }
    //     })
    // }
    getDatas()
    // .done(function (msg) {
    // })

})