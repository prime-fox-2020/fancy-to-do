$(document).ready(function(){
 
    $('#greetings').css('color','red')
    $('.use-class').css('color','blue')
    
    let login_status= false
   
    $('#login').css('color','purple')
    $('#login').click(function(){
        login_status = true
        $('#login-status').text("sudah login")
        $('#login').hide()
        $('#logout').show()
        $('.page-login').hide()
        $('.page-todos').show()
    })

    $('#logout').click(function(){
        login_status = false
        $('#login-status').text("belum login")
        $('#login').show()
        $('#logout').hide()
        $('.page-login').show()
        $('.page-todos').hide()
    })

    // $('#login').css('color','purple')
    // $('#login').click(function(){
    // login_status = true
    // if(login_status == false){
    //     console.log(`${login_status}`)
    //     $('#logout').hide()
    //     $('#login-status').text("belum login")
    //     $('#logout').hide()
    //     $('.page-login').hide()
    //     $('.page-todos').show()
        
    // }else if (login_status == true){
    //     console.log(`${login_status}`)
    //     $('#login').show()
    //     $('#login-status').text("sudah login")
    //     $('#login').hide()
    //     $('#logout').show()
    //     $('.page-login').show()
    //     $('.page-todos').hide()
    //     $('#logout').click(function(){
    //     login_status = false
    //     })
    //     }
    // })
    
    

})