$(document).ready(function(){
    //mengeksekusi sampai semua dokumen beres di render
    
    // ".class" "#id"
    console.log($('#greet'))
    $(".app").hide();

    // Yes No access_token | localStorage.setItem('access_token', 'iseng123') @ web app inspect
    if (localStorage.getItem('access_token')) { // Yes
        $("#todolist").show();
        showTodo()
    }else{                                      // No
        $("#login").show();
    }
    
    //VIEW PAGE BUTTON
    $(document).on("submit", "#login-form", function(event) {
    // $('#login-form').submit(function (event) {
        event.preventDefault()
        console.log('>>> Login button click')
        loginUser()
    })
    $('#btn-gotologin').click(function(e){
        e.preventDefault();
        $(".app").hide();
        $("#login").show();
    });

    $(document).on("submit", "#register-form", function(event) {
    // $('#register-form').submit(function (event) {
        event.preventDefault()
        registerUser()
       
    })
    $('#btn-gotoregister').click(function(e){
        e.preventDefault();
        $(".app").hide();
        $("#register").show();
        
    });

    $("#btn-logout").click(function(e){
        Swal.fire({
        title: 'Logging out now?',
        text: "You might have to login again to enter this page",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Log out please'
        })
        .then((result) => {
            if (result.value) {
                Swal.fire(
                'Logging Out..',
                'Thank you for using Fancy Todo :)',
                'success'
                )

                e.preventDefault()
                localStorage.removeItem("access_token")

                $(".app").hide();
                $("#login").show();
            } 
            else if (result.dismiss === Swal.DismissReason.cancel) { 

            }
        })
    })

    $('#btn-add').click(function(e){
        e.preventDefault();
        $(".app").hide();
        $("#add").show();
    });
    // $(document).on("click", "#btn-list-from-add", function(e) {
    $('#btn-list-from-add').click(function(e){
        e.preventDefault();
        $(".app").hide();
        $("#todolist").show();
    });
    $('#add-form').submit(function(event){
        event.preventDefault()
        addTodo()
    })


    $('#btn-show').click(function(e){
        e.preventDefault();
        $(".app").hide();
        $("#findatodo").show();
    });
    $(document).on("click", "#btn-list-from-findatodo", function(e) {
    // $('#btn-list-from-findatodo').click(function(e){
        e.preventDefault();
        $(".app").hide();
        $("#todolist").show();
    });


    $('#btn-edit').click(function(e){
        e.preventDefault();
        $(".app").hide();
        $("#edit").show();
    });
    $(document).on("click", "#btn-list-from-edit", function(e) {
    // $('#btn-list-from-edit').click(function(e){
        e.preventDefault();
        $(".app").hide();
        $("#todolist").show();
    });

})