$(document).ready(function () {
    $(document).ready(function () {
        $(".the-element").hide();

        // function login () {
        //     $.ajax({
        //         url: 'http://localhost:3000/login',
        //         type: 'post',
        //         data: {email : }
        //     })
        //     .done(function () {

        //     })
        //     .fail(function () {

        //     })
        //     .always(function () {

        //     })
        // }

        function getTodos () {
            $.ajax({
                url: 'http://localhost:3000/todos',
                type: 'get'
            })
            .done(function (response) {
                for (let i = 0; i < response.length; i++) {
                    $new_row = `
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Edit Delete</td>
                    </tr>
                    `
                    $("#todosTBody").append($new_row)
                }
            })
        }
        if (localStorage.getItem('access_token')) {
            $("#theTodos").show()
            getTodos()
        } else {
            $("#theLogin").show()
        }

        // $("#login-submit").submit(function (e) {
        //     e.preventDefault()
        // })

        $("#regis-btn").click(function () {
            $(".the-element").hide()
            $("#theRegister").show()
        })

        $("#login-btn").click(function () {
            $(".the-element").hide()
            $("#theLogin").show()
        })
    })
    // $("#titlepage").css('color', 'blue')
    // $(".subtitle")
})