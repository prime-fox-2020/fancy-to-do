$(document).ready(function(){
 
    $('#greetings').css('color','red')
    $('.use-class').css('color','blue')
    
    let login_status= false
   
    $('#login').css('color','purple')
    $('#login').click(function(){

        login_status = true
        if(login_status == true){
        $('#login-status').text("sudah login")
        $('#login').hide()
        $('#logout').show()
        $('.page-login').hide()
        $('.page-todos').show()
        }
    })

    $('#logout').click(function(){
        login_status = false
        if(login_status == false){
        $('#login-status').text("belum login")
        $('#login').show()
        $('#logout').hide()
        $('.page-login').show()
        $('.page-todos').hide()
        }
    })    

    $('#search-todo').submit(function(e){
        console.log('submit')
    })

    $.ajax({
        type: 'GET',
        url : 'http://127.0.0.1:5500/client/'
    })
    .done(function(){

    })
    .fail(function(){

    })
    .always(function(){
        
    })

})