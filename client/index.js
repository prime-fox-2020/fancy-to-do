$(document).ready(function(){
 
    $('#greetings').css('color','red')
    $('.use-class').css('color','blue')
    
    let login_status= false

    if(!localStorage.getItem('access_token')){
        login_status = false
    }else{
        login_status = true
    }
        
    $('#logout').click(function(){
        login_status = false
        localStorage.setItem("access_token","")
        $('#login-status').text("belum login")
        $('#login').show()
        $('#logout').hide()
        $('.page-login').show()
        $('.page-todos').hide()
    })

    if(login_status == false){
        $('#login-status').text("belum login")
        $('#login').show()
        $('#logout').hide()
        $('.page-login').show()
        $('.page-todos').hide()
    }else{
        $('#login-status').text("sudah login")
        $('#login').hide()
        $('#logout').show()
        $('.page-login').hide()
        $('.page-todos').show()
        $('.todos-mytodos').hide()
        findAllTodos()
    }

   
         

    $('#credential').submit(function(e){
        e.preventDefault()
        const username = $('#username').val()
        const password = $('#password').val()

        $.ajax({
            type: 'POST',
            url : 'http://localhost:3000/users/login',
            data : { username : username , password : password}
        })
        .done(function(res){
            localStorage.setItem("access_token", res.access_token);
            findAllTodos()
            $('#credential').hide()
        })
        .fail(function(err){
            console.log(err)
        })
        .always(function(){
            
        })
    })
    
    
    function findAllTodos(){
        $.ajax({
            type: 'GET',
            url : 'http://localhost:3000/todos',
            headers: { access_token: localStorage.getItem('access_token')}
        })
        .done(function(res){
            console.log(res)
            const elFindAll = $('#findAll')
            let dataFindAll = '';

            res.forEach((el)=>{
            dataFindAll +=  `<tr>
                            <td>${el.title}</td>
                            <td>${el.description}</td>
                            <td>${el.status}</td>
                            <td>${el.id}
                            <button class = 'edit-data' 
                                data-id = '${el.id}' 
                                data-title = '${el.title}'
                                data-desc = '${el.description}'
                                data-status = '${el.status}'
                                data-due-date = '${el.due_date}'
                                >Edit</button></td>
                            <td>${el.id}
                            <button class = 'delete-data' 
                                data-id = '${el.id}' 
                                data-title = '${el.title}'
                                data-desc = '${el.description}'
                                data-status = '${el.status}'
                                data-due-date = '${el.due_date}'
                                >Delete</button></td>
                        <tr>`
            })
            elFindAll.html(dataFindAll)

        })
        .fail(function(err){
            console.log(err)
        })
        .always(function(){

        })
    }   

    $('#search-button').submit(function(e){
        e.preventDefault()
        console.log($('#findAll').val())
    })

    $('#mylist').click(function(){
        $('.todos-findAll').hide()
        $.ajax({
            type: 'GET',
            url : 'http://localhost:3000/todos/mytodos',
            headers: { access_token: localStorage.getItem('access_token')},
        })
        .done(function(res){
            console.log(res)
            const elMyTodos = $('#mytodos')
            let myTodos = '';

            res.forEach((el)=>{
            myTodos +=  `<tr>
                            <td>${el.title}</td>
                            <td>${el.description}</td>
                            <td>${el.status}</td>
                            <td>${el.id}
                            <button class = 'edit-data' 
                                data-id = '${el.id}' 
                                data-title = '${el.title}'
                                data-desc = '${el.description}'
                                data-status = '${el.status}'
                                data-due-date = '${el.due_date}'
                                >Edit</button></td>
                            <td>${el.id}
                            <button class = 'delete-data' 
                                data-id = '${el.id}' 
                                data-title = '${el.title}'
                                data-desc = '${el.description}'
                                data-status = '${el.status}'
                                data-due-date = '${el.due_date}'
                                >Delete</button></td>
                        <tr>`
            })
            elMyTodos.html(myTodos)
        })
        .fail(function(err){
            console.log(err)
        })
        .always(function(){

        })
        
    })
    
    $('body').on('click','.delete-data',function(req){
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/todos/' + $(this).attr('data-id'),
            headers : { access_token: localStorage.getItem('access_token')}
        })
        .done(function(res){
            getMyTodos()
        })
        .fail(function(err){
            console.log(err)
        })
        .always(function(){

        })
    })


    $('body').on('click','.edit-data',function(req){
        $('#edit-pop-up').simplePrompt({
            id:`${$(this).attr('data-id')}`,
            title : `${$(this).attr('data-title')}`,
            description : `${$(this).attr('data-desc')}`,
            status : `${$(this).attr('data-status')}`,
            due_date : `${$(this).attr('data-due-date')}`,
            success : function(result){
                console.log(result)
            }
        })
    })














    /// showing myTodos again
    function getMyTodos(){
        $.ajax({
            type: 'GET',
            url : 'http://localhost:3000/todos/mytodos',
            headers: { access_token: localStorage.getItem('access_token')},
        })
        .done(function(res){
            console.log(res)
            const elMyTodos = $('#mytodos')
            let myTodos = '';

            res.forEach((el)=>{
            myTodos +=  `<tr>
                            <td>${el.title}</td>
                            <td>${el.description}</td>
                            <td>${el.status}</td>
                            <td>${el.id}<button class = 'edit-data' data-id = '${el.id}'>Edit</button></td>
                            <td>${el.id}<button class = 'delete-data' data-id = '${el.id}' >Delete</button></td>
                        <tr>`
            })
            elMyTodos.html(myTodos)
        })
        .fail(function(err){
            console.log(err)
        })
        .always(function(){

        })
    }


    $('#adding').submit(function(){
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/todos/',
            headers : { access_token: localStorage.getItem('access_token')}
        })
        .done(function(res){

        })
        .fail(function(err){

        })
        .always(function(){

        })
    })


})