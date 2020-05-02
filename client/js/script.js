const serverTodo = 'http://localhost:3000'
$(document).ready(() => {
  $('.collapsible').collapsible()
  $('.modal').modal()
  $('.datepicker').datepicker()

  if (localStorage.access_token) {
    $('#logoutButton').show()
    $('#dashboardSection').show()
    getTodos()
  } else {
    $('#loginForm').show()
  }

  $('#userLoginForm').on('submit', (event) => {
    event.preventDefault()
    const email = $('#userEmailLogin').val()
    const password = $('#userPasswordLogin').val()
    userLogin(email, password)
  })
  
  $('#userRegisterForm').on('submit', (event) => {
    event.preventDefault()
    const user = {}
    user.first_name = $('#first_name').val()
    user.last_name = $('#last_name').val()
    user.email = $('#userEmailRegister').val()
    user.password = $('#userPasswordRegister').val()
    userRegister(user)
  })
  
  $('#buttonLoginForm').on('click', (event) => {
    event.preventDefault()
    $('#loginForm').show()
    $('#registerForm').hide()
    $('#registerError').hide()
    $('#registerErrorText').val('')
  });
  
  $('#buttonRegisterForm').on('click', (event) => {
    event.preventDefault()
    $('#loginForm').hide()
    $('#registerForm').show()
    $('#loginError').hide()
    $('#loginErrorText').val('')
  })
  
  $('#logoutButton').on('click', (event) => {
    event.preventDefault()
    userLogout()
    M.toast({html: 'See ya!'})
  })

  $('#todosParent').on('click', '.todo-delete', function(event) {
    event.preventDefault()
    const todo = $(this).parent()

    let lanjutkan = window.confirm('Are you sure want to delete?')
    if (lanjutkan) deleteTodo(todo)
  })

  $('#todosParent').on('click', '.todo-edit', function(event) {
    event.preventDefault()
    const todo = $(this).parent()
    
    resetForm()
    editTodo(todo)
  })

  $('#todosParent').on('click', '.todo-status', function(event) {
    event.preventDefault()
    const todo = $(this).parent()
  
    updateStatus(todo)
  })

  $('#dashboardSection').add('#moviesSection').on('click', '.add-todo', (event) => {
    event.preventDefault()
    $('.form-edit-todo').html('<h5>Add new todo</h5>')
    resetForm()
    $('#add-todo').modal('open')
  })

  $('#addNewTodo').on('submit', (event) => {
    const formMethod = $('.form-method-todo').val() || 'add'
    const newTodo = {}
    event.preventDefault()

    newTodo.title = $('#titleTodo').val()
    newTodo.description = $('#descriptionTodo').val()
    newTodo.status = $('[name=statusTodo]').filter(':checked').val()
    newTodo.due_date = $('[name=due_dateTodo]').val()

    if(newTodo.due_date) newTodo.due_date = convertMyDate(newTodo.due_date)
    if (formMethod === 'add') {
      addTodo(newTodo)
    } else {
      newTodo.id = formMethod
      updateTodo(newTodo)
    }
  })

  $('.showTodos').on('click', (event) => {
    event.preventDefault()

    $('#dashboardSection').show()
    $('#moviesSection').hide()
  })

  $('#moviesParent').on('click', '.insert-into-todo', function (event) {
    event.preventDefault()
    const title = $(this).parent().parent().parent().prev()[0].innerText
    const description = $(this).parent().prev().children()[0].innerText
    addMoo = $(this)
    $('.form-edit-todo').html('<h5>Add schedule to watch movie</h5>')
    $('[name=titleTodo]').val(title)
    $('[for=titleTodo]').addClass('active')
    $('#descriptionTodo').val(description)
    $('[for=descriptionTodo]').addClass('active')
    $('[name=statusTodo][value=active]').prop('checked', true)
    $('.form-method-todo').val('')
    
    $('#add-todo').modal('open')
  })

  $('.search-movies').on('click', (event) => {
    event.preventDefault()
    // resetMovieForm()
    $('#movieFormModal').modal('open')
  })

  $('#searchMovieForm').on('submit', (event) => {
    event.preventDefault()
    const query = $('#inputMovieTitle').val()
    $('#movieFormModal').modal('close')
    $('.loading').modal('open')

    searchMovie(query)
  })
})

function searchMovie(query) {
  $.ajax({
    method: 'GET',
    url: serverTodo + '/movies',
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      query
    }
  })
  .done(response => {
    clearMovies()
    $('.no-movie-found').hide()
    $('#dashboardSection').hide()
    $('#moviesSection').show()
    if (response.length) {
      response.forEach(item => {
        let list = `
        <div class="col s12 m6">
        <p class="flow-text">${item.movie.title}</p>
          <div class="card horizontal">
            <div class="card-image">
              <img src="http://img.omdbapi.com/?apikey=70a7913d&i=${item.movie.ids.imdb}" alt="${item.movie.title}">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <h5>${item.movie.tagline}</h5>
                <p>${item.movie.overview}</p>
              </div>
              <div class="card-action">`
        item.movie.homepage ? list += `<a href="${item.movie.homepage}">Official Website</a>` : list += ''
        list += `<a class="insert-into-todo waves-effect waves-light red btn-large"><i class="material-icons left">add_to_queue</i>Save to ToDO</a>
              </div>
            </div>
          </div>
        </div>
        `
        $('#moviesParent').append(list)
      })
    } else {
      $('.no-movie-found').show()
    }
    $('.loading').modal('close')
  })
  .fail(err => {
    console.log(err)
  })
}

function resetForm() {
  $('.form-method-todo').val('')
  $('#titleTodo').val('')
  $('#descriptionTodo').val('')
  $('[name=statusTodo][value=active]').prop('checked', true)
  $('[name=due_dateTodo]').val('')
}

function userLogout() {
  localStorage.removeItem('access_token')
  signOut()
  $('#loginForm').show()
  $('#logoutButton').hide()
  $('#loginError').hide()
  $('#dashboardSection').hide()
  $('#moviesSection').hide()
  clearTodos()
  clearMovies()
}

function userLogin(email, password) {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/login',
    data: {
      email,
      password
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    $('#loginError').hide()
    $('#loginForm').hide()
    $('#logoutButton').show()
    $('#dashboardSection').show()
    getTodos()
    M.toast({html: 'Hey! Good to see you again!'})
  })
  .fail(err => {
    $('#loginErrorText').text('')
    $('#loginErrorText').text(err.responseJSON.message)
    $('#loginError').show()
  })
}

function userRegister({first_name, last_name, email, password}) {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/register',
    data: {
      first_name,
      last_name,
      email,
      password
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    $('#registerError').hide()
    $('#registerForm').hide()
    $('#logoutButton').show()
    $('#dashboardSection').show()
    getTodos()
    M.toast({html: `Hello ${first_name}, Nice to meet you!`})
  })
  .fail(err => {
    $('#registerErrorText').text('')
    $('#registerErrorText').text(err.responseJSON.message)
    $('#registerError').show()
  })
}

function clearTodos() {
  $('#todosParent').children('.card-image').remove()
}

function clearMovies() {
  $('#moviesParent').children('.col.s12').remove()
}

function getTodos() {
  $.ajax({
    method: 'GET',
    url: serverTodo + '/todos',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(response => {
    console.log({response})
    if (response.length) {
      response.forEach(item => {
        let dueDate = new Date(item.due_date)
        if (dueDate < new Date() && item.status === 'active') {
          item.status = 'pastdue'
        }
      })
      response.forEach(item => {
        const list = `
        <li data-id="${item.id}" class="card-image">
          <a class="btn-floating halfway-fab waves-effect waves-light todo-status"><i class="material-icons" style="color: black; font-size: 2.5rem;">${item.status === 'completed' ? 'check_box' : 'check_box_outline_blank'}</i></a>
          <a class="btn-floating halfway-fab waves-effect waves-light todo-edit" teal><i class="material-icons">edit</i></a>
          <a class="btn-floating halfway-fab waves-effect waves-light todo-delete red"><i class="material-icons">delete</i></a>
          <div class="collapsible-header${item.status === 'completed' ? ' todo-completed' : ''}${item.status === 'pastdue' ? ' red lighten-4' : ''}"  style="padding-left: 5rem;">
            <h5>${item.title}</h5>
            <h5 style="margin-left: auto; margin-right: 10rem;">${item.due_date}</h5>
          </div>
          <div class="collapsible-body white${item.status === 'completed' ? ' todo-completed' : ''}" style="padding-left: 5rem;">
          <span>${item.description}</span>
          </div>
        </li>
        `
        $('#todosParent').append(list)
      })
      $('.no-todo-found').hide()
    } else {
      $('.no-todo-found').show()
    }
  })
  .fail(err => {
    console.log({err})
  })
}

function deleteTodo(todo) {
  const id = todo.attr('data-id')

  $.ajax({
    method: 'DELETE',
    url: serverTodo + '/todos/' + id,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    if(response.todo) {
      todo.remove()
      M.toast({html: response.message})
    }
  })
  .fail(err => {
    console.log(err)
  })
}

function addTodo(obj) {
  const {title, description = '', status = 'active', due_date = ''} = obj

  $.ajax({
    method: 'POST',
    url: serverTodo + '/todos',
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
  .done(response => {
    console.log(response)
    $('.modal').modal('close')
    clearTodos()
    getTodos()
    resetForm()
    M.toast({html: 'New todo added successfully :)'})
  })
  .fail(err => {
    console.log('gagal son')
    console.log(err)
  })
}

function updateTodo(obj) {
  const {id, title, description = '', status = 'active', due_date = ''} = obj

  $.ajax({
    method: 'PUT',
    url: serverTodo + '/todos/' + id,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
  .done(response => {
    $('.modal').modal('close')
    clearTodos()
    getTodos()
    resetForm()
    M.toast({html: 'Your todo item updated successfully :)'})
  })
  .fail(err => {
    console.log('gagal son')
    console.log(err)
  })
}

function editTodo(node) {
  const id = node.attr('data-id')

  $.ajax({
      method: 'GET',
      url: serverTodo + '/todos/' + id,
      headers: {
        access_token: localStorage.access_token
      }
  })
  .done(response => {
    $('.form-edit-todo').html('<h5>Edit todo</h5>')
    $('[name=titleTodo]').val(response.title)
    $('[for=titleTodo]').addClass('active')
    $('#descriptionTodo').val(response.description)
    $('[for=descriptionTodo]').addClass('active')
    $('[name=statusTodo][value='+ response.status +']').prop('checked', true)
    $('[name=due_dateTodo]').val(dateFromDB(response.due_date))
    $('.form-method-todo').val(id)
    
    $('#add-todo').modal('open')
  })
  .fail(err => {
    console.log(err)
  })
}

function updateStatus(node) {
  const id = node.attr('data-id')
  let status = node.children().eq(0)[0].innerText
  status === 'check_box' ? status = 'active' : status = 'completed'
  
  $.ajax({
    method: 'PATCH',
    url: serverTodo + '/todos/' + id,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      status
    }
  })
  .done(response => {
    if (status === 'active') {
      node.find('i')[0].innerText = 'check_box_outline_blank'
      node.find('i').removeClass('material-icons')
      node.find('i').addClass('material-icons')
      node.find('.collapsible-header').removeClass('todo-completed')
      node.find('.collapsible-body').removeClass('todo-completed')
    } else {
      node.find('i')[0].innerText = 'check_box'
      node.find('i').removeClass('material-icons')
      node.find('i').addClass('material-icons')
      node.find('.collapsible-header').addClass('todo-completed')
      node.find('.collapsible-body').addClass('todo-completed')
      // node.children().eq(0).innerHTML = '<i class="material-icons" style="color: black; font-size: 2.5rem;">check_box</i>'
    }
    console.log(node.find('i'))
  })
  .fail(err => {
    console.log(err)
  })
  console.log(status)
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  if (!localStorage.getItem('access_token')) googleLogin(id_token)
}

function googleLogin(id_token) {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/login/googleLogin',
    data: {
      id_token
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    getTodos()
    $('#loginError').hide()
    $('#loginForm').hide()
    $('#logoutButton').show()
    $('#dashboardSection').show()
    M.toast({html: 'Hey! Welcome!'})
  })
  .fail(err => {
    $('#loginErrorText').text('')
    $('#loginErrorText').text(err.responseJSON.message)
    $('#loginError').show()
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out.')
  })
}

function dateFromDB(str) {
  // mmm dd, yyyy from yyyy-mm-dd
  const [yyyy, mm, dd] = str.split('-')
  const mmm = [
    'mmm',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  return `${mmm[Number(mm)]} ${dd}, ${yyyy}`
}

function convertMyDate(str) {
  // mmm dd, yyyy
  const mmm = [
    'mmm',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const dd = str.slice(4, 6)
  const mm = mmm.indexOf(str.slice(0, 3)) > 9 ? 'mmm.indexOf(str.slice(0, 3))' : `0${mmm.indexOf(str.slice(0, 3))}`
  const yyyy = str.slice(8)
  let result = yyyy + '-' + mm + '-' + dd
  return result
}