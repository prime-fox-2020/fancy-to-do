function main(){
  $(document).ready(function(){

    start()

    function start(){

      
      const login = localStorage.getItem('access_token')
      
      //get todos
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/todos/',
        headers:{
          access_token: login
        }
      })
      .done(result => {
        const todos = getTodos(result)
        $('.todos').html(todos)
      })
      .fail(err => console.log(err.responseJSON))
      
      if(!login){
        $('#welcome').show()
        $('#login').show()
        $('#login-failed').hide()
        $('#register').hide()
        $('#todo').hide()
      }else{
        $('#welcome').hide()
        $('#login').hide()
        $('#register').hide()
        $('#todo').show()
        getWheater()
      }
    }

    //get todos
    function getTodos(data){
      let todos = ''
      for(let todo of data){
        todos += `
        <li class="todo"> <h4>${todo.title}</h4>
          <button class="delete btn btn-info" data-toggle="modal" data-target="#delete${todo.id}">Delete</button>
          <button class="edit btn btn-info" data-toggle="modal" data-target="#edit${todo.id}">Edit</button>
          <ul>
            <li>
              <p> status: ${todo.status}</p>
            </li>
            <li>
              <p class="lead"> description: ${todo.description}</p>
            </li>
          </ul>
          <hr>
        </li>
        `
      }
      return todos
    }

    function getWheater(){
      const login = localStorage.getItem('access_token')
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/users/location',
        headers:{
          access_token: login
        }
      })
      .done(loc =>{
        if(loc === null || loc === ""){
          $("#wheater p").html("Location is not set yet")
        }else{
          $.ajax({
            type: 'GET',
            url: `http://localhost:3000/weathers?q=${loc}`
          })
          .done(wheater => {
            console.log(wheater)
            $("#wheater p").html(wheater.weather[0].description.toUpperCase())
          })
          .fail(err => console.log(err.responseJSON))
        }
      })
      .fail(err => console.log(err.responseJSON))
    }

    $('#logout').click(function(){
      localStorage.removeItem('access_token')
      $('#login-email').val("")
      $('#login-password').val("")
      start()
    })


    //logic login
    $('#login-btn').on('click', function(e){
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users/login',
        data:{
          email: $('#login-email').val(),
          password: $('#login-password').val()
        }
      })
      .done(result => {
        localStorage.setItem('access_token', result.access_token)
        $('#login-failed').text('').hide()
        start()
      })
      .fail(err => {
        console.log(err.responseJSON)
        $('#login-failed').text(err.responseJSON.message).show()
      })
      .always(() => {
        $('#login-email').val("")
        $('#login-password').val("")
      })
    })


    //login register swithcer
    $('.login-btn').click(function(e){
      e.preventDefault()
      $('#login').show()
      $('#register').hide()
    })

    $('.register-btn').click(function(e){
      e.preventDefault()
      $('#login').hide()
      $('#register').show()
    })


    //register logic
    $('#register-btn').on('click', function(e){
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users/register',
        data:{
          email: $('#register-email').val(),
          password: $('#register-password').val(),
          location: $('#register-location').val()
        }
      })
      .done(result => {
        localStorage.setItem('access_token', result.access_token)
        $('#registerModal').modal('toggle')
        start()
      })
      .fail(err => {
        $('#emailError').text('')
        $('#passwordError').text('')
        console.log(err.responseJSON)
        const error = err.responseJSON.message.split(',')
        for(let e of error){
          e = e.split(': ')
          if(e[1] === 'Invalid Email format.'){
            $('#emailError').text(e[1])
          }
          if(e[1] === 'Password Cannot be empty'){
            $('#passwordError').text(e[1])
          }
        }
      })
      .always(() => {
        $('#login-email').val("")
        $('#login-password').val("")
        $('#register-location').val("")
      })
    })


    //create
    $('#todo-form').submit(function(e){
      const login = localStorage.getItem('access_token')
      e.preventDefault()
      const title       = $('#todo-title').val()
      const description = $('#todo-description').val()
      const status      = $('#todo-status').val()
      $('.createtitleError').text('')
      $('.createdescriptionError').text('')
      $('#todo-title').val("")
      $('#todo-description').val("")
      $('#todo-status').val()
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/todos',
        headers:{
          access_token: login
        },
        data:{
          title: title,
          description: description,
          status : status
        }
      })
      .done(result => {
        start()
      })
      .fail(err => {
        $('.edittitleError').text('')
        $('.editdescriptionError').text('')
        if(err.responseJSON.message.title){
          $('.createtitleError').text(err.responseJSON.message.title)
        }
        if(err.responseJSON.message.description){
          $('.createdescriptionError').text(err.responseJSON.message.description)
        }
      })
    })


    //update
    $('ul').on('click', '.edit', function(e){
      const login = localStorage.getItem('access_token')
      const li    = $(this).parent()
      const newId = $(this).attr('data-target').slice(1)
      const id    = newId.slice(4)
      $('.edittitleError').text('')
      $('.editdescriptionError').text('')
      $('.modalEdit').attr('id', newId)
      $.ajax({
        type: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers:{
          access_token : login
        }
      })
      .done(result => {
        $('#edit-title').val(result.title)
        $('#edit-description').val(result.description)
        $('#edit-status').val(result.status)

        $('.sure-edit').click(function(e){
          let title       = $('#edit-title').val()
          let description = $('#edit-description').val()
          let status      = $('#edit-status').val()
          
          $.ajax({
            type: 'PUT',
            url: `http://localhost:3000/todos/${id}`,
            headers:{
              access_token: login
            },
            data:{
              title: title,
              description: description,
              status : status
            }
          })
          .done(result => {
            start()
          })
          .fail(err => {
            console.log(err.responseJSON)
            $('.createtitleError').text('')
            $('.createdescriptionError').text('')
            if(err.responseJSON.message.title){
              $('.edittitleError').text(err.responseJSON.message.title)
            }
            if(err.responseJSON.message.description){
              $('.editdescriptionError').text(err.responseJSON.message.description)
            }
          })
        })
      })
      .fail(err => console.log(err.responseJSON))
    })


    //delete
    $('ul').on('click', '.delete', function(e){
      const login = localStorage.getItem('access_token')
      const li    = $(this).parent()
      const newId = $(this).attr('data-target').slice(1)
      const id    = newId.slice(6)
      $('.modalDelete').attr('id', newId)
      $('.sure-delete').click(function(e){
        li.fadeOut(500,function(){
          $.ajax({
            type:'DELETE',
            url: `http://localhost:3000/todos/${id}`,
            headers:{
              access_token: login
            }
          })
          .done(result => start())
          .fail(err => console.log(err.responseJSON))
        })
      })
    })

  })
}

main()