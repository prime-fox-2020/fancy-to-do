$(document).ready(function() {
    
    $("#status").hide()

    // $("button").click(function(){
        
    //     if(!registerStatus){
    //         registerStatus = true
    //         $("#successRegist").show();
    //     } else{
    //         registerStatus = false
    //         $("#successRegist").hide()

    //     }
    //   });
    $('#formLogin').submit(function(e){
        e.preventDefault()
        let formInput = {email: $('#emailInput').val(), password: $('#passInput').val()}
        
        for(let key in formInput){
            if(formInput[key] == ""){
                delete formInput[key]
            }
        }
        console.log(formInput)

// data regist ke database
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/register",
            data: formInput
        })
        .done(data => {
            // console.log(data)
            $("#status").html('Registrasi Sukses').addClass("btn-success").removeClass("btn-warning").show()
        })
        .fail(err => {
            console.log(err)
            $("#status").html('Kolom belum lengkap').addClass("btn-warning").removeClass("btn-success").show()
        })
        .always(() => {
            console.log('proses ini berjalan')
        })

    })
})