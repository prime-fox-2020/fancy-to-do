$(document).ready(function(){
    $("#status").hide()

    $(formLogin).submit(e => {
        e.preventDefault()
        let formInput = {email: $('#emailInput').val(), password: $('#passInput').val()}
        console.log(formInput)

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/login",
            data: formInput
        })
        .done(data => {
            console.log(data)
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log('proses ini berjalan')
        })
    })
})