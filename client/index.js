$(document).ready(function(){


    $(document).ready(()=>{
        $('section').hide()

        if(!localStorage.access_token){
            $('.errorMsg').empty()
            $('#page-google-sign').show()
            $('#page-login').show()
            $('#login').show()
            $('#login-status').text("belum login")
            $('#logout').hide()
          } else {
            $('#login-status').text("sudah login")
            $('#logout').show()
            $('#page-todos').show()
            $('#page-findAll').show()
            findAllTodos()
          }
        $('#credential').submit(function(e){
            e.preventDefault()
            log_in()
            $('#page-login').hide()
        })

        $('#search-box').submit(function(e){
            e.preventDefault()
            const search = $('#search-id').val()
            search_by_id(search)
            $('#page-search').show()
            $('#page-findAll').hide()
        })

        $('#mylist').click(function(){
            myList()
            $('#page-myTodos').show()
            $('#page-findAll').hide()

        })

        $('#logout').click(function(e){
            e.preventDefault()
            localStorage.access_token=''
            
        })

        $('#adding').click(function(){
            addData()
            $('#page-popUp').show()
        })

        $('body').on('click','.edit-data',function(req){
            $('#page-popUp').show()

        })
        

    })





    function log_in(){
        const username = $('#username').val()
        const password = $('#password').val()

        $.ajax({
            type: 'POST',
            url : 'http://localhost:3000/users/login',
            data : { username : username , password : password}
        })
        .done(function(res){
            localStorage.setItem("access_token", res.access_token);
        })
        .fail(function(err){
            console.log(err)
        })
        .always(function(){
            
        })
    }



    function search_by_id(search){
        $.ajax({
            type: 'GET',
            url : 'http://localhost:3000/todos'+'/'+search,
            headers: { access_token: localStorage.getItem('access_token')}
        })
        .done(function(res){
            console.log(res)
            const elFindById = $('#by-id')
            let dataFindById = '';

            res.forEach((el)=>{
                dataFindById +=  `<tr>
                            <td>${el.id}</td>
                            <td>${el.username}</td>
                            <td>${el.title}</td>
                            <td>${el.description}</td>
                            <td>${el.status}</td>
                            <td>${el.due_date}</td>
                            <td>
                            <button class = 'edit-data' 
                                data-id = '${el.id}'
                                data-username = '${el.username}'
                                data-title = '${el.title}'
                                data-desc = '${el.description}'
                                data-status = '${el.status}'
                                data-due-date = '${el.due_date}'
                                >Edit</button></td>
                            <td>
                            <button class = 'delete-data' 
                                data-id = '${el.id}'
                                data-username = '${el.username}'
                                data-title = '${el.title}'
                                data-desc = '${el.description}'
                                data-status = '${el.status}'
                                data-due-date = '${el.due_date}'
                                >Delete</button></td>
                        <tr>`
            })
            elFindById.html(dataFindById)
            
        })
        .fail(function(err){
            console.log(err)
        })
        .always(function(){

        })
    }

    
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
                            <td>${el.id}</td>
                            <td>${el.username}</td>
                            <td>${el.title}</td>
                            <td>${el.description}</td>
                            <td>${el.status}</td>
                            <td>${el.due_date}</td>
                            <td>
                            <button class = 'edit-data' 
                                data-id = '${el.id}'
                                data-username = '${el.username}'
                                data-title = '${el.title}'
                                data-desc = '${el.description}'
                                data-status = '${el.status}'
                                data-due-date = '${el.due_date}'
                                >Edit</button></td>
                            <td>
                            <button class = 'delete-data' 
                                data-id = '${el.id}'
                                data-username = '${el.username}'
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
 

    function myList(){
        $.ajax({
            type: 'GET',
            url : 'http://localhost:3000/todos/mytodos',
            headers: { access_token: localStorage.getItem('access_token')},
        })
        .done(function(res){
            const elMyTodos = $('#mytodos')
            let myTodos = '';
            res.forEach((el)=>{
            myTodos +=  `<tr>
                            <td>${el.id}</td>
                            <td>${el.username}</td>
                            <td>${el.title}</td>
                            <td>${el.description}</td>
                            <td>${el.status}</td>
                            <td>${el.due_date}</td>
                            <td>
                            <button class = 'edit-data' 
                                data-id = '${el.id}'
                                data-username = '${el.username}'
                                data-title = '${el.title}'
                                data-desc = '${el.description}'
                                data-status = '${el.status}'
                                data-due-date = '${el.due_date}'
                                >Edit</button></td>
                            <td>${el.id}
                            <button class = 'delete-data' 
                                data-id = '${el.id}'
                                data-username = '${el.username}'
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
    }
    
    $('body').on('click','.delete-data',function(req){
        $('#page-popUp').show()
        $('#delete-confirmation').simpleConfirm({
            message : `${$(this).attr('data-id')}`,
            success : function(answer){
                $.ajax({
                    type: 'DELETE',
                    url: 'http://localhost:3000/todos/'
                    +`${answer.id}`
                    ,
                    headers : { access_token: localStorage.getItem('access_token')}
                })
                .done(function(res){
                    findAllTodos()
                })
                .fail(function(err){
                    console.log(err)
                })
                .always(function(){

                })
                    }
                })
            })


    $('body').on('click','.edit-data',function(req){
        $('#page-popUp').show()
        $('#edit-pop-up').simplePrompt({
            id:`${$(this).attr('data-id')}`,
            username:`${$(this).attr('data-username')}`,
            title : `${$(this).attr('data-title')}`,
            description : `${$(this).attr('data-desc')}`,
            status : `${$(this).attr('data-status')}`,
            due_date : `${$(this).attr('data-due-date')}`,
            success : function(result){
                $.ajax({
                    type: 'PUT',
                    url: 'http://localhost:3000/todos/'
                    +`${result.id}`
                    ,
                    headers : { access_token: localStorage.getItem('access_token')},
                    data : result
                })
                .done(function(res){
                    findAllTodos()
                })
                .fail(function(err){
                    
                })
                .always(function(){
                    
                })
            }
        })
        
  
    })

    function addData(){
        $.ajax({
            type: 'GET',
            url : 'http://localhost:3000/users/info',
            headers: { access_token: localStorage.getItem('access_token')},
        })
        .done(function(res){
            addButton(res)
        })
        .fail(function(err){
                    
        })
        .always(function(){
            
        })

    }

    function addButton(info){
    $('#adding-pop-up').simpleAdd({
        id:``,
        username:`${info.username}`,
        title : ``,
        description : ``,
        status : ``,
        due_date : ``,
        success : function(result){
            console.log(result)
            $.ajax({
                type: 'POST',
                    url: 'http://localhost:3000/todos/'                    ,
                headers : { access_token: localStorage.getItem('access_token')},
                data : result
            })
            .done(function(res){
                findAllTodos()
            })
            .fail(function(err){
                console.log(err)
            })
            .always(function(){
                
            })
        }
    })
    }
    




})